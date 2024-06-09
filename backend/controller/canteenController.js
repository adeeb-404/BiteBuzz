import Canteen from "../model/canteenSchema.js";

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
