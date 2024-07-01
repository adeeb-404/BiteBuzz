import { Router } from "express";
import { canteenAuth, displayStorage ,orderComplete,changePassword} from "../controller/canteenController.js";
const router = Router();

router.post("/login", canteenAuth);
router.get("/menu",displayStorage);
router.post("/settings",changePassword);
router.post("/orderComplete",orderComplete);    
export default router;
