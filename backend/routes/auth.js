import express from 'express';
import * as auth from '../controller/auth.js';

const userRoute = express.Router();

userRoute.post("/", auth.userAuth);

export default userRoute;