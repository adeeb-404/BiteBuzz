import  express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/auth.js";

const processDotnet=dotenv.config();

const DB=(process.env.DB_CONNECT);
// console.log(process.env.PORT);
mongoose.connect(DB).then(conn=>{
    console.log("connection successful..");
})
const app = express();
app.use(express.json());
const PORT=process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});


app.post("/", (req, res) => {
    console.log("POST method working successfully");
});

// Route to handle POST requests to /login
app.use("/login", userRoute);