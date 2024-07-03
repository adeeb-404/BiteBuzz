import User from "../model/userSchema.js";
import OrdersSchema from "../model/baseOrderSchema.js";
import Canteen from "../model/canteenSchema.js";
import { getStudentName, getStudentUSN } from "../utility/util.js";
import mongoose from "mongoose";

export async function userAuth(req, res) {
  console.log("In controller");
  const obj = req.body;

  // Implement your authentication logic here
  try {
    const user = await User.findOne(obj);
    const listCanteens = await Canteen.find();
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect!" }); // Send 400 status response and return
    }

    const userDoc = user.toObject();
    delete userDoc.password;

    // console.log(userDoc);
    res.json({ body: userDoc }); // Send 200 status response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
}

export async function profile(req, res) {
  const id = req.params.id;
  // console.log(id);
  let user = await User.findById(id);
  user = user.toObject();
  delete user.password;
  delete user.history;
  delete user.currOrders;

  return res.json(user);
}

export async function changePassword(req, res) {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Find user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare currentPassword with user's current password
    if (currentPassword !== user.password.toString()) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Update user's password to newPassword
    const updatedPassword = await User.findByIdAndUpdate(
      userId,
      { $set: { password: newPassword } },
      { new: true }
    );
    console.log(updatedPassword);
    if (!updatedPassword) {
      return res.status(404).json({ error: "password not changed" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Server error" });
  }
}

export async function submitOrder(req, res) {
  let obj = req.body;
  const user = await User.findById(obj.userID);
  const findCanteen = await Canteen.findById(obj.canteenID);
  const canteenName = findCanteen.name;
  try {
    const arrivalTime = obj.arrivalTime;

    for (let i = 0; i < obj.orders.length; i++) {
      try {
        const quantity = obj.orders[i].quantity;
        let findItem = await Canteen.findOne(
          {
            name: findCanteen.name,
            menu: {
              $elemMatch: {
                dishName: obj.orders[i].dishName,
              },
            },
          },
          { "menu.$": 1 }
        );

        if (findItem) {
          findItem = findItem.toObject();
          const currTime = new Date().getTime();
          const time = findItem.menu[0].preparationTime * (60 * 1000);
          const finalTime = new Date(currTime + time).toLocaleTimeString();
          const currentQuantity = findItem.menu[0].quantity;
          if (currentQuantity - quantity < 0) {
            res
              .status(400)
              .send("Not enough stock for item: " + obj.orders[i].dishName);
            return;
          }
          obj.orders[i].expectedTime = finalTime;
          obj.orders[i].photo = findItem.menu[0].photo; // Add photo from the menu item
          obj.orders[i].rating = findItem.menu[0].rating;

          await Canteen.updateOne(
            {
              _id: findCanteen._id,
              "menu.dishName": obj.orders[i].dishName,
            },
            {
              $set: {
                "menu.$.quantity": currentQuantity - quantity,
              },
            }
          );
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Error finding item");
        return;
      }
    }

    const ordersArray = obj.orders.map((order) => ({
      _id: new mongoose.Types.ObjectId(),
      price: order.price,
      photo: order.photo,
      itemName: order.dishName, // Assuming dishName corresponds to itemName
      quantity: order.quantity,
      rating: order.rating,
      expectedTime: order.expectedTime,
    }));

    const responseBody = {
      price: obj.price,
      canteenName: canteenName,
      name: user.name,
      usn: user.usn,
      arrivalTime: arrivalTime,
      orders: ordersArray,
    };

    res.json(responseBody);

    try {
      await Canteen.findByIdAndUpdate(
        findCanteen._id,
        { $push: { currOrders: responseBody } } // Push responseBody to currOrders
      );

      await User.findByIdAndUpdate(
        obj.userID,
        { $push: { currOrders: responseBody } } // Push ordersArray to orders
      );
    } catch (updateErr) {
      console.error(updateErr);
      res.status(500).send("Error updating orders");
      return;
    }

    console.log(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing order");
  }
}

export async function dashboard(req, res) {
  try {
    const canteenDetails = await Canteen.aggregate([
      {
        $unwind: "$menu",
      },
      {
        $sort: { "menu.rating": -1 },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          photo: { $first: "$photo" },
          description: { $first: { $substrCP: ["$description", 0, 200] } },
          rating: { $first: "$rating" },
          top5: { $push: "$menu" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          photo: 1,
          description: 1,
          rating: 1,
          top5: { $slice: ["$top5", 5] }, // Limit to top 5 dishes per canteen
        },
      },
    ]);

    return res.json(canteenDetails);
  } catch (err) {
    console.error("Error fetching canteen details:", err);
  }
}

export async function canteenMenu(req, res) {
  try {
    let id = req.params.id;
    // id=id.toString();
    // console.log(typeof(id));
    const menuOfCanteen = await Canteen.findById(id, {
      menu: true,
      _id: false,
    });

    return res.json(menuOfCanteen);
  } catch (err) {}
}

export async function displayHistory(req, res) {
  const canteenId = req.params.id; // Canteen ID from the request parameters
  const userId = req.body.userId; // User ID from the request body

  try {
    // Retrieve the user document
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the canteen document to get the canteen name
    const canteen = await Canteen.findById(canteenId);

    if (!canteen) {
      return res.status(404).json({ message: "Canteen not found" });
    }

    const canteenName = canteen.name;

    // Filter the user's current orders for the specific canteen
    const currentOrders = user.currOrders.filter(
      (order) => order.canteenName === canteenName
    );
    // Filter the user's order history for the specific canteen
    const orderHistory = user.history.filter(
      (history) => history.canteenName === canteenName
    );

    return res.json({
      currentOrders,
      orderHistory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving order history" });
  }
}
