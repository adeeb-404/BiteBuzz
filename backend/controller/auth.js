import users from '../model/userSchema.js'

export const userAuth = async (req, res) => {
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
