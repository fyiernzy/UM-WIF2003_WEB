import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import ProfileImage from "../../ProfileImage";
import { likeComment, unlikeComment } from "../../../../api/commentsApi";
import { useUserContext } from "../../../../context/UserContext";

function Comment({ comment }) {
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (comment?.likes?.includes(user._id)) {
      setIsLiked(true);
    }
    setNumberOfLikes(comment?.likes?.length || 0);
  }, [comment, user._id]);

  const handleLikeComment = async () => {
    const currentlyLiked = isLiked;
    setIsLiked(!currentlyLiked);

    if (currentlyLiked) {
      setNumberOfLikes((prev) => prev - 1);
      await unlikeComment(comment._id, user._id);
    } else {
      setNumberOfLikes((prev) => prev + 1);
      await likeComment(comment._id, user._id);
    }
  };

  if (!comment) {
    return null;
  }

  return (
    <div className="tw-flex tw-mb-4 tw-items-start">
      <ProfileImage user={comment.author} className="tw-w-10 tw-h-10 tw-mr-3" />

      <div className="tw-flex-grow tw-bg-white tw-p-3 tw-rounded-lg tw-shadow">
        <div className="tw-flex tw-justify-between tw-items-center">
          <div>
            <span className="tw-font-bold">{comment.author.username}</span>
            <span className="tw-text-xs tw-text-gray-500 tw-ml-2">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <button
            className={`${
              isLiked ? "tw-text-blue-500" : "tw-text-slate-300"
            } tw-flex tw-items-center tw-mr-3 `}
            onClick={handleLikeComment}
          >
            <FontAwesomeIcon icon={faThumbsUp} className=" tw-mr-2" />
            <span>{numberOfLikes}</span>
          </button>
        </div>
        <p className="tw-my-2">{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;
