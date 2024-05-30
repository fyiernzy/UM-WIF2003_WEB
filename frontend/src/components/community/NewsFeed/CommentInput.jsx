import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";
import { motion } from "framer-motion";

function CommentInput({ onSubmit }) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="tw-flex tw-items-center">
      <Image
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="profile"
        roundedCircle
        className="tw-w-10 tw-h-10 tw-rounded-full tw-object-cover tw-mr-2"
      />
      <input
        type="text"
        value={comment}
        onChange={handleCommentChange}
        className="tw-flex-grow tw-p-2 tw-rounded-l-lg tw-border-none tw-bg-gray-100 focus:tw-outline-none"
        placeholder="Write a comment..."
      />

      <motion.button
        type="submit"
        className="tw-ml-2 tw-p-2 tw-bg-blue-500 tw-text-white tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center
      hover:tw-bg-blue-700"
        whileHover={{
          scale: [1, 1.05, 0.9, 1],
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </motion.button>
    </form>
  );
}

export default CommentInput;
