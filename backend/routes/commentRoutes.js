import express from "express";
import CommentController from "../controllers/commentController.js";

const router = express.Router();

router.post("/posts/:postId/comments", CommentController.addComment);
router.get("/posts/:postId/comments", CommentController.getCommentsByPostId);
router.delete("/comments/:commentId", CommentController.deleteComment);
router.put("/comments/:commentId", CommentController.modifyComment);
router.post("/comments/:commentId/like", CommentController.likeComment);
router.post("/comments/:commentId/unlike", CommentController.unlikeComment);

export default router;
