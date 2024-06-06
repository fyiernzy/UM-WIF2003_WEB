// Keeping all the logic part of projects.js here
// For better code separation
import e, { json } from "express";
import { Project } from "../models/projectModel.js";
import User from "../models/userModel.js";
import { Notification } from "../models/notificationModel.js";
import { saveNotification } from "./notificationController.js";
import {
  buildApplyingMessage,
  buildFileUploadedMessage,
} from "../helpers/notificationMessageBuilder.js";
import { sendNotif } from "../utils/socket-io.js";

export const getAllProjects = async (req, res) => {
  try {
    let query = { taken: false };
    if (req.query.q) {
      const searchQuery = req.query.q;
      const regex = new RegExp(searchQuery, "i");
      query = { projectTitle: regex };
    }
    const projects = await Project.find(query).populate("postedBy");
    // console.log("Backend - projects: " + projects);
    return res.status(200).json({
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const postNewProject = async (req, res) => {
  try {
    const newProject = {
      companyName: req.body.companyName,
      projectTitle: req.body.projectTitle,
      projectDescription: req.body.projectDescription,
      projectCategory: req.body.projectCategory,
      location: req.body.location,
      projectDuration: req.body.projectDuration,
      filters: req.body.filters,
      contactInformation: req.body.contactInformation,
      additionalNotes: req.body.additionalNotes,
      deadline: new Date(req.body.deadline),
      projectBudget: req.body.projectBudget,
      requiredSkills: req.body.requiredSkills,
      agreedToTerms: req.body.agreedToTerms,
    };
    const project = await Project.create(newProject).then((project) =>
      console.log("project created: ", project)
    );
    return res.status(201).send(project);
  } catch (error) {
    console.log(error.message);
    //When send is used with object, we are returning a JSON
    res.status(500).send({ message: error.message });
  }
};

export const getProjectDetails = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId).populate("postedBy");
    return res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const saveFavoriteProject = async (req, res) => {
  console.log(req.body);
  const { userId, projectId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    if (!user.favoriteProjects.includes(projectId)) {
      user.favoriteProjects.push(projectId);
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Inside POST /favorite-project endpoint " + error.message,
    });
  }
};

export const removeFavoriteProject = async (req, res) => {
  const { userId, projectId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favoriteProjects = user.favoriteProjects.filter(
      (id) => id.toString() !== projectId
    );
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: "Inside POST /remove-favorite-project endpoint " + error.message,
    });
  }
};

export const getFavoriteProjects = async (req, res) => {
  const userId = req.params.userId;
  console.log("getfavprojects req.body: " + userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ favoriteProjects: user.favoriteProjects });
  } catch (error) {
    res.status(400).json({
      error: "Inside GET /favorite-project endpoint " + error.message,
    });
  }
};
export const getFavoriteProjectsDetails = async (req, res) => {
  const userId = req.params.userId;
  console.log("getfavprojects req.body: " + userId);
  try {
    const user = await User.findById(userId).populate({
      path: "favoriteProjects",
      populate: { path: "postedBy", select: "username" },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ favoriteProjects: user.favoriteProjects });
  } catch (error) {
    res.status(400).json({
      error: "Inside GET /favorite-project endpoint " + error.message,
    });
  }
};
export const addApplyingProject = async (req, res) => {
  console.log(req.body);
  const { userId, projectId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    if (!user.applyingProjects.includes(projectId)) {
      user.applyingProjects.push(projectId);
      await user.save();
    }
    const project = await Project.findById(projectId).populate("postedBy");
    if (!project.applicants.includes(userId)) {
      project.applicants.push(userId);
      await project.save();
    }
    const notif = buildApplyingMessage(user, project);
    await saveNotification(notif);
    res.status(200).json({ user, project });
  } catch (error) {
    return res.status(400).json({
      error: "Inside POST /applying-project endpoint " + error.message,
    });
  }
};
export const getApplyingProjects = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).populate("applyingProjects");
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Inside GET /applying-project endpoint " + error.message,
    });
  }
};

export const removeApplyingProject = async (req, res) => {
  const { userId, projectId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.applyingProjects.includes(projectId)) {
      user.applyingProjects.pull(projectId);
      await user.save();
    } else {
      return res.status(200).json({ message: "no error" });
    }
    const project = await Project.findById(projectId);
    if (project.applicants.includes(userId)) {
      project.applicants.pull(userId);
      await project.save();
    } else {
      return res.status(200).json({ message: "no error" });
    }
  } catch (error) {
    return res.status(400).json({
      error: "Inside PUT /applying-project endpoint " + error.message,
    });
  }
};
export const saveTakenProject = async (req, res) => {
  console.log(req.body);
  const { userId, projectId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    if (!user.takenProjects.includes(projectId)) {
      user.takenProjects.push(projectId);
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Inside POST /taken-project endpoint " + error.message,
    });
  }
};

export const getTakenProjects = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).populate("takenProjects");
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Inside GET /taken-project endpoint " + error.message,
    });
  }
};

export const saveCompletedProject = async (req, res) => {
  const { userId, projectId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    if (!user.completedProjects.includes(projectId)) {
      user.completedProjects.push(projectId);
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Inside POST /completed-project endpoint " + error.message,
    });
  }
};

export const getCompletedProjects = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).populate("completedProjects");
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Inside GET /completed-project endpoint " + error.message,
    });
  }
};

export const uploadCompletedWorks = async (req, res) => {
  try {
    console.log(
      "Projectid and userid: " + req.body.projectId + "  " + req.body.userId
    );
    console.log("Uploaded req.files: " + Array.isArray(req.files));
    const files = req.files;
    const uploadedFiles = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const obj = {
        fileUrl: file.destination + "/" + file.filename,
        fileName: file.filename,
      };
      uploadedFiles.push(obj);
    }
    const project = await Project.findByIdAndUpdate(req.body.projectId, {
      serviceProvider: req.body.userId,
      uploadedFiles: uploadedFiles,
    })
      .populate("postedBy")
      .exec();
    const user = await User.findById(req.body.userId);
    // user.takenProjects.pull(req.body.projectId);
    // user.completedProjects.push(req.body.projectId);
    await user.save();
    const notif = buildFileUploadedMessage(user, project);
    await saveNotification(notif);
    return res.status(200).json(project);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Inside POST /upload-work endpoint " + error.message });
  }
};
