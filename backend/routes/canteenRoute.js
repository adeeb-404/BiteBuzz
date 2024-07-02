import { Router } from "express";
import {
  canteenAuth,
  displayStorage,
  orderComplete,
  changePassword,
  updateMenu,
  displayOrders,
  displayHistory,
  profile,
} from "../controller/canteenController.js";
const router = Router();

router
  .post("/login", canteenAuth)
  .post("/orderComplete", orderComplete)
  .post("/settings", changePassword)
  .post("/:id/menu", updateMenu)
  .get("/:id", displayOrders)
  .get("/:id/menu", displayStorage)
  .get("/:id/profile", profile)
  .get("/:id/history", displayHistory);

export default router;
