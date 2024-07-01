import Canteen from "../model/canteenSchema.js";
import User from "../model/userSchema.js";
export async function canteenAuth(req, res) {
  const { phone, password } = req.body;

  console.log("Received phoneNo:", phone);
  console.log("Received password:", password);

  try {
    // Find the canteen by phone number
    let user = await Canteen.findOne({ phone: phone, password: password });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored password
    console.log("Stored password:", user.password);
    if (password === user.password) {
      const body = user.toObject();
      delete body.password;
      console.log(body);
      return res
        .status(200)
        .json({ message: "Authentication successful", body });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error during authentication:", err);
    return res
      .status(500)
      .json({ message: "An error occurred during authentication" });
  }
}

export async function changePassword(req, res) {
  try {
    const { canteenId, currentPassword, newPassword } = req.body;

    // Find user by userId
    const canteen = await Canteen.findById(canteenId);

    if (!canteen) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare currentPassword with user's current password
    if (currentPassword !== canteen.password.toString()) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Update user's password to newPassword
    const updatedPassword = await Canteen.findByIdAndUpdate(canteenId, { $set: { password: newPassword } }, { new: true });

    if (!updatedPassword) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function displayStorage(req,res){
  try{
    const obj=req.body;
    const canteenId=obj.canteenId;
    console.log(canteenId);
    const storageArray=await Canteen.findById(canteenId,{storage:true,_id:false});
    console.log(storageArray);
    return res.json(storageArray);
  }
  catch(err){
    console.log(err);
    return res.json(500)
  }
}


export async function orderComplete(req, res) {
  try {
    const obj = req.body;
    const canteen = await Canteen.findById(obj.canteenId);
    const canteenName = canteen.name; // Get the canteen name directly from the `canteen` object
    let userOrders = [];

    if (!canteen) {
      return res.status(404).json({ message: "Canteen not found" });
    }

    userOrders = canteen.currOrders.filter(orderGroup => orderGroup.usn === obj.usn);

    if (userOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Convert userOrders to plain objects
    await Canteen.findById(canteen._id,{"$push":{"history":userOrders}});
    
    userOrders = userOrders.map(orderGroup => orderGroup.toObject());

    // Add canteen name and remove unnecessary fields
    userOrders.forEach(orderGroup => {
      delete orderGroup.name;
      delete orderGroup.usn;
      orderGroup.orders.forEach(order => {
        order.canteenName = canteenName; // Add canteen name
        delete order.canteenID;
      });
    });

    // Push the updated userOrders to the history
    await Canteen.findByIdAndUpdate(
      obj.canteenId,
      { $push: { history: { $each: userOrders } } }
    );

    console.log(userOrders);

    return res.json(userOrders);

  } catch (err) {
    console.error(err);
    return res.status(500).send("Error completing order");
  }
}
