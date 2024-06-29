import { Router } from "express";
import {
  userAuth,
  submitOrder,
  dashboard,
  canteenMenu,
  displayHistory,
  changePassword,
} from "../controller/userController.js";

const router = Router();

router
  .post("/login", userAuth)
  .post("/orders", submitOrder)
  .get("/dashboard", dashboard)
  .post("/settings", changePassword)
  .get("/:id", canteenMenu)
  .post("/:id/history", displayHistory);

export default router;
