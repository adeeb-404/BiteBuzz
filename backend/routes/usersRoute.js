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
  .post("/orders", submitOrder)
  .get("/:id/profile", profile)
  .post("/settings", changePassword)
  .get("/:id", canteenMenu)
  .post("/:id/history", displayHistory);

export default router;
