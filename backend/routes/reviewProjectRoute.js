import express from "express";
import { Project } from "../models/projectModel.js";
import User from "../models/userModel.js";
import {
  buildApplicationSuccessMessage,
  buildFileApprovedMessage,
} from "../helpers/notificationMessageBuilder.js";
import { saveNotification } from "../controllers/notificationController.js";

const router = express.Router();

// Route to get projects based on status
router.get("/:status", async (req, res) => {
  try {
    const { status } = req.params;
    const userId = req.query.userId;

    let projects;

    if (status === "posted") {
      projects = await Project.find({
        taken: false,
        completed: false,
        postedBy: userId,
      });
    } else if (status === "in-progress") {
      projects = await Project.find({
        taken: true,
        completed: false,
        postedBy: userId,
      }).populate("serviceProvider");
    } else if (status === "completed") {
      projects = await Project.find({
        completed: true,
        postedBy: userId,
      }).populate("serviceProvider");
    } else {
      return res.status(400).json({ message: "Invalid status parameter" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/move-to-in-progress/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    // Update the project status to in-progress
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { status: 'in-progress' },
      { new: true }
    ).populate('serviceProvider'); // Make sure to populate the serviceProvider

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to fetch applicants for a specific project
router.get("/posted/:projectId/applicants", async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate("applicants");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project.applicants);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to confirm applicant of a project
router.put("/posted/:projectId/confirm", async (req, res) => {
  const { projectId } = req.params;
  const { userID } = req.body;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.takenProjects.includes(projectId)) {
      user.takenProjects.push(projectId);
      user.applyingProjects.pull(projectId);
      await user.save();
    }

    const project = await Project.findById(projectId).populate("postedBy");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.applicants = [];
    project.serviceProvider = userID;
    project.taken = true;
    await project.save();
    const notif = buildApplicationSuccessMessage(user, project);
    await saveNotification(notif);
    res.json({ project, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to remove applicant from a project
router.put("/posted/:projectId/remove", async (req, res) => {
  const { projectId } = req.params;
  const { userID } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.applicants.pull(userID);
    await project.save();

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.applyingProjects.includes(projectId)) {
      user.applyingProjects.pull(projectId);
      await user.save();
    }
    res.json({ project, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to delete a project
router.delete("/posted/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to accept the file for a project
router.post("/:projectId/accept-file", async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;
  console.log("userid in accept file: " + userId);
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.completed = true;
    project.fileAccepted = true;
    await project.save();

    const user = await User.findById(userId);
    user.takenProjects.pull(projectId);
    user.completedProjects.push(projectId);
    await user.save();

    const notif = buildFileApprovedMessage(user, project);
    await saveNotification(notif);

    res.json({ message: "File accepted" });
  } catch (error) {
    res.status(500).json({
      error: "Inside accept-file endpoint " + error.message,
    });
  }
});

// Route to reject all files for a project
router.post("/:projectId/reject-file", async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.uploadedFiles = [];
    project.completed = false;
    await project.save();

    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to save a review for a project
router.post("/:projectId/saveReview", async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      satisfactionRating,
      projectRating,
      projectFeedback,
      collaboratorRating,
      collaboratorFeedback,
    } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.review = {
      satisfactionRating,
      projectRating,
      projectFeedback,
      collaboratorRating,
      collaboratorFeedback,
    };

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
