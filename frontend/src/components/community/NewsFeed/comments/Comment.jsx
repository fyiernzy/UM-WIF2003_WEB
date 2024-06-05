import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import ProfileImage from "../../ProfileImage";

function Comment({ comment, onLike }) {
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
            className="tw-text-blue-500 tw-flex tw-items-center"
            onClick={onLike}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="tw-mr-1" />
            <span>{comment.likes}</span>
          </button>
        </div>
        <p className="tw-my-2">{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;
