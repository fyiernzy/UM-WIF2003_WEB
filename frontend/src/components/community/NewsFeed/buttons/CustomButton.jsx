import { useState } from "react";
import { usePostContext } from "../../../../context/PostContext";
import {
  faCommentDots,
  faPaperPlane,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import ShareModal from "../modals/ShareModal";
import BaseButton from "./BaseButton";

export const CommentButton = () => {
  const { isCommentActive, setIsCommentActive } = usePostContext();

  return (
    <BaseButton
      icon={faCommentDots}
      label="Comment"
      onClickFunction={() => {
        setIsCommentActive(!isCommentActive);
      }}
      isActive={isCommentActive}
      inActiveClassName="tw-text-red-500"
    />
  );
};

export const SendButton = () => (
  <BaseButton
    icon={faPaperPlane}
    label="Send"
    onClickFunction={() => {}}
    isActive={false}
    inActiveClassName="tw-text-red-500"
  />
);

export const ShareButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="tw-flex-grow">
      <BaseButton
        icon={faShare}
        label="Share"
        onClickFunction={() => setIsModalOpen(!isModalOpen)}
        isActive={false}
        inActiveClassName="tw-text-red-500"
      />

      <ShareModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
