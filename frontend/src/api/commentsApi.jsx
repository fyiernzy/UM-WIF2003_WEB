import axios from "../utils/customAxios";
import { readAndLog } from "../utils/responseHandler.tsx";

const API_URL = "http://localhost:5050/api/community";

export const fetchComments = async (postId) => {
  try {
    const res = await axios.get(`${API_URL}/posts/${postId}/comments`);
    readAndLog(res, "Failed to fetch comments");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const postComments = async (postId, userId, comment) => {
  try {
    const res = await axios.post(`${API_URL}/posts/${postId}/comments`, {
      postId,
      userId,
      comment,
    });
    console.log("res data in commentsApi.jsx, ", res.data);
    readAndLog(res, "Comment posted successfully", "Failed to post comment");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const likeComment = async (postId, commentId, userId) => {};

export const postLikes = async (postId, userId) => {
  try {
    const res = await axios.post(API_URL + `/posts/${postId}/likes`, {
      postId,
      userId,
    });
    readAndLog(res, "Post liked successfully", "Failed to like post");
  } catch (err) {
    console.error(err);
  }
};
