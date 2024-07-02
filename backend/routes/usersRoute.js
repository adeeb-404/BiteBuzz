import { Router } from "express";
import {
  userAuth,
  submitOrder,
  dashboard,
  canteenMenu,
  displayHistory,
  changePassword,
  profile,
} from "../controller/userController.js";

const router = Router();

router
  .post("/login", userAuth)
  .get("/dashboard", dashboard)
  .get("/:id/profile",profile)
  .get("/:id", canteenMenu)
  .post("/orders", submitOrder)
  .post("/settings", changePassword)
  .post("/:id/history", displayHistory);

export default router;
