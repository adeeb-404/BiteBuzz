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
      return res.status(404).json({ message: "phone or password is invalid" });
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
    // const obj=req.body;
    const canteenId=req.params.id;
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

export async function displayOrders(req,res){
  const obj=req.params.id;
  console.log(obj);
  const currentOrders=await Canteen.findById(obj,{currOrders:true});
  try{
  if(!currentOrders){
    return res.json({"message":"No Pending Orders"});
  }
  return res.json({currentOrders});
}catch(err){
  return res.json(500);
}
}


export async function orderComplete(req, res) {
  try {
    const obj = req.body;
    const userId = await User.findOne({ usn: obj.usn }, '_id');
    const canteen = await Canteen.findById(obj.canteenId);

    if (!canteen) {
      return res.status(404).json({ message: "Canteen not found" });
    }

    // Get the user's orders from the canteen's current orders
    let userOrders = canteen.currOrders.filter(orderGroup => orderGroup.usn === obj.usn);

    if (userOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    await Canteen.findByIdAndUpdate(
      canteen._id,
      { $push: { history: { $each: userOrders } } }
    );

    // Convert userOrders to plain objects and remove unnecessary fields
    userOrders = userOrders.map(orderGroup => {
      orderGroup = orderGroup.toObject();
      delete orderGroup.name;
      delete orderGroup.usn;
      orderGroup.canteenName = canteen.name;
      return orderGroup;
    });

    // Push the updated userOrders to the history in the canteen document
   

    // Remove the user's orders from the current orders in the canteen document
    await Canteen.findByIdAndUpdate(
      canteen._id,
      { $pull: { currOrders: { usn: obj.usn } } }
    );

    // Push the updated userOrders to the history in the user document
    await User.findByIdAndUpdate(
      userId._id,
      { $push: { history: { $each: userOrders } } }
    );

    // Remove the user's orders from the current orders in the user document
    await User.findByIdAndUpdate(
      userId._id,
      { $pull: { currOrders: { canteenName: canteen.name } } }
    );

    return res.json(canteen.currOrders);

  } catch (err) {
    console.error(err);
    return res.status(500).send("Error completing order");
  }
}

export async function updateMenu(req,res){
const obj=req.body;
console.log(obj);
const canteenId=req.params.id;
try{
  const update=await Canteen.findByIdAndUpdate(canteenId,{"$push":{menu:obj}});
  if(!update){
    return res.json({"message":"Failed to update the menu"}).sendStatus(401);
  }
  else{
    return res.json({"message":"items updated successfully to your menu"});
  }
}catch(err){
  return res.json(500);
}

}

