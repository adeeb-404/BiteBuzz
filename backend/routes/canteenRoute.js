import { Router }  from "express";
import { canteenAuth } from "../controller/canteenController.js";
const router = Router();

router
.post("/login",canteenAuth)


export default router;