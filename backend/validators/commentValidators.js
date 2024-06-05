import Joi from "joi";

export const postIdSchema = Joi.object({
  postId: Joi.string().required(),
});

export const userIdSchema = Joi.object({
  userId: Joi.string().required(),
});

export const commentIdSchema = Joi.object({
  commentId: Joi.string().required(),
});

export const commentSchema = Joi.object({
  content: Joi.string().min(1).required(),
});

export const addCommentSchema = Joi.object({
  postId: Joi.string().required(),
  userId: Joi.string().required(),
  comment: Joi.string().min(1).required(),
});

export const modifyCommentSchema = commentIdSchema.concat(commentSchema);

export const deleteCommentSchema = commentIdSchema;

export const likeCommentSchema = commentIdSchema.concat(userIdSchema);
