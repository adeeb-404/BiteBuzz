import users from '../model/userSchema.js'
import OrdersSchema from "../model/baseOrderSchema.js";
import Canteen from "../model/canteenSchema.js"; 

export async function userAuth(req, res){
    console.log("In controller");
    const obj = req.body;
    console.log(obj);

    // Implement your authentication logic here
    try {
        const user = await users.findOne(obj);
        if (!user) {
            return res.status(400).json({message:"Username or password is incorrect!"}); // Send 400 status response and return
        }

        const userDoc = user.toObject();
        delete userDoc.password;
       
        
        console.log(userDoc);
        res.json({body:userDoc}); // Send 200 status response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Server error');
    }
};

export async function submitOrder(req, res){
    const obj = req.body;

    try {
       
         console.log(obj);
        const findOut = await Canteen.findById(obj.canteenID);
        // console.log(findOut);
        // console.log(expectedTime[0]);
        // console.log(time);
        // if (!findOut) {
        //     return res.status(400).json({ message: "Canteen or dish not found" });
        // }
        
        const currTime = new Date().getTime();
        console.log(findOut.menu[0].dishName)
        const time = findOut.menu[0].preparationTime*(60*1000);
        const finalTime = new Date(currTime+time ).toLocaleTimeString();
        obj.expectedTime = finalTime;

        console.log(findOut.Name);
        // const updateOrder = await Canteen.updateOne(
        //     { Name: toCanteen, 'menu.dishName': dis},
        //     { $push: { 'currOrders': obj } }
        // );

        // if (!updateOrder || updateOrder.nModified === 0) {
        //     return res.status(400).json({ message: "Update failed" });
        // }
       const findItem =await Canteen.find({ "Name": findOut.Name, "menu.itemID": { $eq: obj.itemID} }, { "menu.$": 1 });
      console.log(findItem);
       res.status(200).json({ message: "Order submitted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

