import { Router } from "express";
import {
  canteenAuth,
  displayStorage,
  orderComplete,
  changePassword,
  updateMenu,
  displayOrders,
} from "../controller/canteenController.js";
const router = Router();

router.post("/login", canteenAuth);
router.get("/:id/menu", displayStorage);
router.get("/:id", displayOrders);
router.post("/:id/menu", updateMenu);
router.post("/settings", changePassword);
router.post("/orderComplete", orderComplete);
export default router;
