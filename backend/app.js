import express from "express";
import userRoute  from "./routes/users.js";
const PORT = 3000;

const app = new express();

app.use('/users',userRoute);

app.get("/", (req, res) => res.send("<h1>Temp text</h1>"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
