import express from "express";
import upload from "../middlewares/fileUpload.js";
import PostController from "../controllers/postController.js";
import { addPostSchema } from "../validators/postValidators.js";
import PostService from "../services/PostService.js";

const router = express.Router();

router.post("/posts", upload.array("images"), async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    const { title, content, userId } = req.body;
    const images = req.files.map((file) => ({
      path: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
    }));

    console.log("Processed Images:", images);

    await PostService.postNewPost(userId, title, content, images);

    return res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put(
  "/posts/:postId",
  upload.array("images", 10),
  PostController.modifyPost
);
router.get("/posts/:postId/stats", PostController.fetchPostStats);
router.get("/posts", PostController.getAllPosts);
router.get("/posts/:postId", PostController.getPostById);
router.get("/posts/user/:userId", PostController.getAllPostsByUserId);
router.delete("/posts/:postId", PostController.deletePost);
router.post("/posts/:postId/likes", PostController.likePost);
router.delete("/posts/:postId/likes", PostController.unlikePost);

export default router;
