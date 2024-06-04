import Canteen from '../model/canteenSchema.js';

export async function canteenAuth(req, res) {
  const { phoneNo, password } = req.body;

  console.log('Received phoneNo:', phoneNo);
  console.log('Received password:', password);
  
  try {
      // Find the canteen by phone number
    let user = await Canteen.findOne( {"phoneNo":phoneNo,"password":password});
    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored password
    console.log('Stored password:', user.password);
    if (password === user.password) {
        user = user.toObject();
        delete user.password;
        console.log(user);
      return res.status(200).json({ message: "Authentication successful", user });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error('Error during authentication:', err);
    return res.status(500).json({ message: "An error occurred during authentication" });
  }
}
