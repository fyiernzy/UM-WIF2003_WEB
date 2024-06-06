import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Schema } from "mongoose";

const experience = new mongoose.Schema({
  title: {
    type: String,
  },
  employmentType: {
    type: String,
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
  locationType: {
    type: String,
  },
  description: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  },
  from:{
    type:Date
  },
  until:{
    type:Date
  }
});

const product = new Schema({
  title: {
    type: String,
  },
  date: {
    type: Date,
  },
  description: {
    type: String,
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
    },
    role: {
      type: String, // Assuming the role is a string value
      enum: ["recruiter", "freelancer"], // Enumerate the possible roles
      default: "recruiter", // Set a default role if none is provided
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
    },
    state: {
      type: String,
    },
    categories: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
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
    product: [product],
    about: {
      type: String,
    },
    rating: {
      type: String,
      default: "5",
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
    postedProjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ], // new field to store posted projects
  },
  [
    {
      timestamps: true,
    },
  ]
);

const User = mongoose.model("User", userSchema);
export default User;
