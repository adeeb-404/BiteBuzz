import { Router }  from "express";
import {userAuth,submitOrder, dashboard,canteenMenu,displayHistroy,changePassword} from '../controller/userController.js';

const router = Router();


router
.post("/login", userAuth)
.post("/orders",submitOrder)
.get("/dashboard",dashboard)
.post("/settings",changePassword)
.post("/:id",canteenMenu)
.post("/:id/history",displayHistroy)



export default router;