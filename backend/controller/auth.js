import users from '../model/userSchema.js'

export const userAuth = async (req, res) => {
    console.log("In controller");
    const obj = req.body;
    console.log(obj);

    // Implement your authentication logic here
    try {
        const user = await users.insertMany([{ USN: obj.USN, password: obj.password }]);
        if (!user) {
            return res.status(400).send("No user found"); // Send 400 status response and return
        }
        res.sendStatus(200); // Send 200 status response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Server error');
    }
};
