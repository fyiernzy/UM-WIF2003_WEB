import { StatusCodes } from "http-status-codes";
import { Notification } from "../models/notificationModel.js";
import { sendNotif } from "../utils/socket-io.js";
export const saveNotification = async (notif) => {
  // userId here is the target user, not senderId
  // sender and target id are saved together in notif
  console.log("notif is: " + JSON.stringify(notif));
  const { userId, senderId, message } = notif;
  console.log("userid is: " + userId);
  const notification = new Notification({
    userId,
    senderId,
    message,
  });
  await notification.save();
  sendNotif(userId, notification);
};
export const getNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("getNotifications userId: " + userId);
    const response = await Notification.find({ userId: userId, read: false })
      .populate("userId")
      .populate("senderId");
    res.status(StatusCodes.ACCEPTED).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const readNotification = async (req, res) => {
  try {
    const notifId = req.params.notifId;
    const response = await Notification.findByIdAndUpdate(notifId, {
      read: true,
    });
    res.status(StatusCodes.ACCEPTED).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
