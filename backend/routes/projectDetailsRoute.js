import express from "express";
import { Project } from "../models/projectModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const {
      postedBy,
      projectTitle,
      projectDescription,
      location,
      projectCategory,
      projectDuration,
      filter,
      requiredSkills,
      projectBudget,
      deadline,
      contactInformation,
      additionalNotes,
      agreedToTerms,
      posted,
      taken,
      completed,
      applicants,
      serviceProvider,
      review,
      uploadedFiles,
    } = req.body;

    const project = new Project({
      postedBy,
      projectTitle,
      projectDescription,
      location,
      projectCategory,
      projectDuration,
      filter,
      requiredSkills,
      deadline,
      projectBudget,
      contactInformation,
      additionalNotes,
      agreedToTerms,
      posted,
      taken,
      completed,
      applicants,
      serviceProvider,
      review,
      uploadedFiles,
    });

    // Save the project details to MongoDB
    const savedProject = await project.save();
    console.log("Project details uploaded:", savedProject);

    return res.status(201).json(savedProject);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const project = await Project.find();
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/completed-projects/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user and populate the completed projects
    const user = await User.findById(userId).populate("completedProjects");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ completedProjects: user.completedProjects });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
