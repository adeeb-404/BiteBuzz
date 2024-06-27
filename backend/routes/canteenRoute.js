import { Router } from "express";
import { canteenAuth, displayStorage } from "../controller/canteenController.js";
const router = Router();

router.post("/login", canteenAuth);
router.get("/menu",displayStorage);
export default router;
