import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Schema } from "mongoose";

const experience = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  locationType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    role: {
      type: String, // Assuming the role is a string value
      enum: ["recruiter", "freelancer"], // Enumerate the possible roles
      default: "recruiter", // Set a default role if none is provided
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePic: {
      data: Buffer,
      contentType: String,
    },
    headline: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      required: true,
    },
    university: {
      type: String,
    },
    skill: {
      type: [String],
      default: [],
    },
    experience: [experience],
    about: {
      type: String,
    },
    product: {
      type: [String],
      default: [],
    },
    favoriteProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    takenProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    applyingProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    completedProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    
  },
  [
    {
      timestamps: true,
    },
  ]
);

export const User = mongoose.model("User", userSchema);
