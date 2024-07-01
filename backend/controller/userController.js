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
    const listCanteens= await Canteen.find();
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
export async function changePassword(req, res) {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Find user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare currentPassword with user's current password
    if (currentPassword !== user.password.toString()) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Update user's password to newPassword
    const updatedPassword = await User.findByIdAndUpdate(userId, { $set: { password: newPassword } }, { new: true });
    console.log(updatedPassword);
    if (!updatedPassword) {
      return res.status(404).json({ error: 'password not changed' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function submitOrder(req, res) {
  let obj = req.body;

  try {
    const user = await User.findById(obj[0].userID);
    const arrivalTime=obj[0].arrivalTime;
    const findCanteen = await Canteen.findById(obj[0].canteenID);

    for (let i = 0; i < obj.length; i++) {
      try {
        const quantity=obj[i].quantity;
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
          const currentQuantity=findItem.menu[0].quantity;
          if(currentQuantity-quantity<0){
            res.status(400).send("Not enough stock for item: " + obj[i].dishName);
            return;
          }
          obj[i].expectedTime = finalTime;
          obj[i].photo = findItem.menu[0].photo; // Add photo from the menu item
          obj[i].rating = findItem.menu[0].rating;

          await Canteen.updateOne({
            _id:findCanteen._id,
            "menu.dishName":obj[i].dishName,
          },
          {
            "$set":{
              "menu.$.quantity":currentQuantity-quantity
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

    // const name = await getStudentName(user._id);
    // const usn = await getStudentUSN(user._id);
    const id=new mongoose.Types.ObjectId();
    const ordersArray = obj.map((order) => ({
      _id:id,
      userID: order.userID,
      canteenID: order.canteenID,
      photo:order.photo,
      ratings:order.rating,
      itemName: order.dishName, // Assuming dishName corresponds to itemName
      quantity: order.quantity,
      price: order.price,
      expectedTime: order.expectedTime,
    }));

    const responseBody = {

      name:user.name,
      usn:user.usn,
      "arrivalTime":arrivalTime,
      orders: ordersArray 
    };

    res.json(responseBody);

    try {
      await Canteen.findByIdAndUpdate(
        { _id: findCanteen._id },
        { $push: { currOrders: responseBody } }  // Push responseBody to currOrders
      );

      await User.findByIdAndUpdate(
        { _id: obj[0].userID },
        { $push: { currOrders: ordersArray } } // Push ordersArray to orders
      );
    } catch (updateErr) {
      console.error(updateErr);
      res.status(500).send("Error updating orders");
      return;
    }

    // console.log(user );
    console.log(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing order");
  }
}


export async function dashboard(req, res) {
  try {
    const canteenDetails=await Canteen.aggregate([
      {
        $unwind: "$menu"
      },
      {
        $sort: { "menu.rating": -1 }
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          photo: { $first: "$photo" },
          description: { $first: { $substrCP: ["$description", 0, 200] } },
          rating: { $first: "$rating" },
          top5: { $push: "$menu" }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          photo: 1,
          description: 1,
          rating: 1,
          top5: { $slice: ["$top5", 5] } // Limit to top 5 dishes per canteen
        }
      }
    ]);

    return res.json(canteenDetails);

  } catch (err) {
    console.error("Error fetching canteen details:", err);
  }
}


export async function canteenMenu(req,res){

  try{
    let id=req.params.id;
    // id=id.toString();
    // console.log(typeof(id));
    const menuOfCanteen=await Canteen.findById(id,{menu:true,_id:false});

    return res.json(menuOfCanteen);


  }catch(err){

  }

}

export async function displayHistory(req, res) {
  const canteenId = req.params.id; // Canteen ID from the request parameters
  const userId = req.body.userId; // User ID from the request body
  console.log(canteenId)  
  try {
    const user = await User.findById(userId); // Retrieve the user document

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User Data:", user); // Debug: Log the user data

    // Initialize arrays to hold current orders and order history
    let currentOrders = [];
    let orderHistory = [];

   

    
    // console.log("Current Orders Before Filtering:", user.currOrders); 
    currentOrders=user.currOrders.filter(order=>order.canteenID == canteenId)
    console.log("Current Orders After Filtering:", currentOrders); // Debug: Log current orders after filtering

    // Filter the order history for the specific canteen
    console.log("Order History Before Filtering:", user.history); // Debug: Log order history before filtering
    orderHistory=user.history.filter(history=>history.canteenID == canteenId)

    return res.json({
      currentOrders,
      orderHistory
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving order history" });
  }
}

