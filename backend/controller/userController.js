import users from "../model/userSchema.js";
import OrdersSchema from "../model/baseOrderSchema.js";
import Canteen from "../model/canteenSchema.js";

export async function userAuth(req, res) {
  console.log("In controller");
  const obj = req.body;
  console.log(obj);

  // Implement your authentication logic here
  try {
    const user = await users.findOne(obj);
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
  const obj = req.body;
  const findCanteen = await Canteen.findById(obj[0].canteenID);
  for (let i = 0; i < obj.length; i++) {
    try {
      // console.log(obj[i]);
      const findCanteen = await Canteen.findById(obj[i].canteenID);

      let findItem = await Canteen.findOne(
        {
          Name: findCanteen.Name,
          menu: {
            $elemMatch: {
              dishName: obj[i].dishName,
            },
          },
        },
        { "menu.$": 1 }
      );
      // console.log("findItem");
      findItem = findItem.toObject();
      // console.log(findItem);
      const currTime = new Date().getTime();
      const time = findItem.menu[0].preparationTime * (60 * 1000);
      const finalTime = new Date(currTime + time).toLocaleTimeString();
      obj[i].expectedTime = finalTime;
      // console.log(finalTime);

      res.json(obj);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  }
  const updateCurrorders = await Canteen.findByIdAndUpdate(
    { _id: findCanteen._id },
    { $push: { currOrders: obj } }
  );
  console.log(updateCurrorders);
  // console.log(obj);
}

export async function dashboard(req, res) {
  try {
    const canteenDetails = await Canteen.find(
      {}, // Empty filter to select all documents
      { Name: 1, photos: 1, Description: 1, rating: 1 } // Projection
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
