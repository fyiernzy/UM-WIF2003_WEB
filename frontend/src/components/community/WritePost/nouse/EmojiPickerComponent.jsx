import React from "react";
import { Button } from "react-bootstrap";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerComponent = ({
  showEmojiPicker,
  setShowEmojiPicker,
  handleAddEmoji,
}) => (
  <div className="tw-mb-4">
    {showEmojiPicker && <EmojiPicker onEmojiClick={handleAddEmoji} />}
    <Button
      variant="outline-secondary"
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
    >
      {showEmojiPicker ? "Close Emoji Picker" : "Add Emoji"}
    </Button>
  </div>
);

export default EmojiPickerComponent;
