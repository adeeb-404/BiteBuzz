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
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: { password: newPassword } }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
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

    // const name = await getStudentName(user._id);
    // const usn = await getStudentUSN(user._id);

    const ordersArray = obj.map((order) => ({
      userID: order.userID,
      canteenID: order.canteenID,
      itemName: order.dishName, // Assuming dishName corresponds to itemName
      quantity: order.quantity,
      price: order.price,
      expectedTime: order.expectedTime,
    }));

    const responseBody = {

      name:user.name,
      usn:user.usn,
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

    console.log(user);
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
          img: { $first: "$img" },
          desc: { $first: { $substrCP: ["$description", 0, 200] } },
          rating: { $first: "$rating" },
          top5: { $push: "$menu" }
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          img: 1,
          disc: 1,
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

export async function displayHistroy(req,res){
  const canteenId= req.params.id;
  const obj=req.body;  
  const userId=obj.userId;
  const user=await User.findById(userId).lean();
  const filterOrders = (ordersArray) => {
    return ordersArray.map(orderGroup => 
      orderGroup.filter(order => order.canteenID == canteenId)
    ).filter(orderGroup => orderGroup.length > 0);
  };


    const currentOrders = filterOrders(user.currOrders || []);
    const orderHistory = filterOrders(user.history|| []);


   return res.json({
      currentOrders,
      orderHistory
    });

 
}