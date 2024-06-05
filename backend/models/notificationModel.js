import mongoose, { Schema, mongo } from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const Notification = mongoose.model("Notification", notificationSchema);
