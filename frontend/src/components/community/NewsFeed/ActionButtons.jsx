import { AnimatePresence, motion } from "framer-motion";
import LikeButton from "./buttons/LikeButton";
import { ShareButton, SendButton, CommentButton } from "./buttons/CustomButton";
import CommentSection from "./comments/CommentSection";
import { usePostContext } from "../../../context/PostContext";

function ActionButtons() {
  const { isCommentActive } = usePostContext();

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-gap-3 tw-mt-5">
      <div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-gap-3">
        <LikeButton />
        <CommentButton />
        <ShareButton />
        <SendButton />
      </div>

      <AnimatePresence>
        {isCommentActive && (
          <motion.div
            className="tw-w-full tw-mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <CommentSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ActionButtons;
