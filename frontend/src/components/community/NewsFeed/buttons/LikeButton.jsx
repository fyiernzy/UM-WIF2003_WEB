import { useState, useEffect } from "react";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "./BaseButton";
import LoginModal from "../modals/LoginModal";
import { useUserContext } from "../../../../context/UserContext";
import { usePostContext } from "../../../../context/PostContext";
import { likePost, unlikePost, fetchPostStats } from "../../../../api/postApi";

const LikeButton = () => {
  const [isLikeActive, setIsLikeActive] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useUserContext();
  const { post, postId, setNumberOfLikes, setNumberOfComments } =
    usePostContext();

  useEffect(() => {
    if (post && user && post.likes.includes(user._id)) {
      setIsLikeActive(true);
    }
  }, [post, user]);

  const fetchAndUpdateStats = async () => {
    try {
      const stats = await fetchPostStats(postId);
      setNumberOfLikes(stats.numberOfLikes);
      setNumberOfComments(stats.numberOfComments);
    } catch (error) {
      console.error("Error fetching post stats:", error);
    }
  };

  const handleLike = async () => {
    setIsLikeActive(!isLikeActive);
    if (!isLikeActive) {
      try {
        await likePost(postId, user._id);
        fetchAndUpdateStats();
      } catch (error) {
        console.error("Error liking post:", error);
      }
    } else {
      try {
        await unlikePost(postId, user._id);
        fetchAndUpdateStats();
      } catch (error) {
        console.error("Error un-liking post:", error);
      }
    }
  };

  const handleButtonClick = () => {
    if (user) {
      handleLike();
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="tw-flex-grow">
      <BaseButton
        icon={faThumbsUp}
        label="Like"
        isActive={isLikeActive}
        onClickFunction={handleButtonClick}
        inActiveClassName="tw-text-red-500"
      />
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default LikeButton;
