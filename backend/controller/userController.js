import User from "../model/userSchema.js";
import OrdersSchema from "../model/baseOrderSchema.js";

import Canteen from "../model/canteenSchema.js";
import { getStudentName, getStudentUSN } from "../utility/util.js";
export async function userAuth(req, res) {
  console.log("In controller");
  const obj = req.body;
  

  // Implement your authentication logic here
  try {
    const user = await User.findOne(obj);
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

export async function submitOrder(req, res) {
  let obj = req.body;
  console.log(obj);
  try {
    const user = await User.findById(obj[0].userID);
    const findCanteen = await Canteen.findById(obj[0].canteenID);

    for (let i = 0; i < obj.length; i++) {
      try {
        let findItem = await Canteen.findOne(
          {
            name: findCanteen.name,
            menu: {
              $elemMatch: {
                dishName: obj[i].dishName,
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
          obj[i].expectedTime = finalTime;
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Error finding item");
        return;
      }
    }

    const name = await getStudentName(user._id);
    const usn = await getStudentUSN(user._id);

    const ordersArray = obj.map(order => ({
      userID: order.userID,
      canteenID: order.canteenID,
      itemName: order.dishName, // Assuming dishName corresponds to itemName
      quantity: order.quantity,
      price: order.price,
      expectedTime: order.expectedTime
    }));

    const responseBody = {
      name,
      usn,
      orders: ordersArray,
      arrivalTime:obj[0].arrivalTime
    };

    res.json(responseBody);

  //   try {
  //     await Canteen.findByIdAndUpdate(
  //       { _id: findCanteen._id },
  //       { $push: { currOrders: ordersArray } } // Push as an array of arrays of objects
  //     );

  //     await User.findByIdAndUpdate(
  //       { _id: obj[0].userID },
  //       { $push: { orders: ordersArray } } // Push as an array of arrays of objects
  //     );
  //   } catch (updateErr) {
  //     console.error(updateErr);
  //     res.status(500).send("Error updating orders");
  //     return;
  //   }

    console.log(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing order");
  }
}

export async function dashboard(req, res) {
  try {
    const canteenDetails = await Canteen.find(
      {}, // Empty filter to select all documents
      { Name: 1, photo: 1, Description: 1, rating: 1 } // Projection
    );

    if (canteenDetails.length === 0) {
      console.log("No canteens found");
      return res.json(200);
    }

    console.log("Canteen details:", canteenDetails);
    return res.json(canteenDetails);
  } catch (err) {
    console.error("Error fetching canteen details:", err);
  }
}
