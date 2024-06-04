import { Router }  from "express";
import {userAuth,submitOrder} from '../controller/userController.js';

const router = Router();

router
.post("/login", userAuth)
.post("/orders",submitOrder)


export default router;