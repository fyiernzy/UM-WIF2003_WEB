import React, { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ postId, post, children }) => {
  const [isCommentActive, setIsCommentActive] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length || 0);
  const [numberOfComments, setNumberOfComments] = useState(
    post.comments.length || 0
  );

  return (
    <PostContext.Provider
      value={{
        postId,
        post,
        isCommentActive,
        setIsCommentActive,
        numberOfLikes,
        setNumberOfLikes,
        numberOfComments,
        setNumberOfComments,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
