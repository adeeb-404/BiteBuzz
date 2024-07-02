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
  .post("/orders", submitOrder)
  .post("/settings", changePassword)
  .post("/:id/history", displayHistory)
  .get("/dashboard", dashboard)
  .get("/:id", canteenMenu)
  .get("/:id/profile", profile);

export default router;
