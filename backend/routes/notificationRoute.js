import e from "express";
import User from "../models/userModel.js";
import {
  getNotifications,
  readNotification,
} from "../controllers/notificationController.js";

const router = e.Router();

router.get("/:userId", getNotifications);
router.put("/read/:notifId", readNotification);

export default router;
