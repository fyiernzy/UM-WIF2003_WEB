import { useState, useEffect } from "react";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import { fetchComments, postComments } from "../../../../api/commentsApi";
import { usePostContext } from "../../../../context/PostContext";
import { useUserContext } from "../../../../context/UserContext";

function CommentSection() {
  const { postId } = usePostContext();
  const { user } = useUserContext();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const data = await fetchComments(postId);
      setComments(data);
    };

    loadComments();
  }, [postId]);

  const handleCommentSubmit = async (text) => {
    const newComment = await postComments(postId, user._id, text);
    console.log("newComment in CommentSection.jsx: ", newComment);
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="tw-w-full tw-bg-gray-100 tw-p-4 tw-rounded-lg">
      <div
        className={`tw-flex tw-flex-col ${
          comments.length > 0 ? "tw-mb-4" : "tw-mb-0"
        }`}
      >
        {comments.map((comment, idx) => (
          <Comment key={idx} comment={comment} />
        ))}
      </div>
      <CommentInput onSubmit={handleCommentSubmit} />
    </div>
  );
}

export default CommentSection;
