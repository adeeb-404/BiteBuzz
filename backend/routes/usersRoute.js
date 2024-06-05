import { Router }  from "express";
import {userAuth,submitOrder, dashboard} from '../controller/userController.js';

const router = Router();

router
.post("/login", userAuth)
.post("/orders",submitOrder)
.post("/dashboard",dashboard)


export default router;