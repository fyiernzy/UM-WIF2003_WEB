// Sender and receiver uses userModel.js
// const notif = buildApplyingMessage(user, project.postedBy, project);
// await saveNotification(notif);
// receiver is userId, not user object
export const buildApplyingMessage = (sender, receiverId, project) => {
  console.log("buildapplying message receiver: " + receiverId);
  const message = `${sender.username} has applied for your "${project.projectTitle}".`;
  return {
    userId: receiverId,
    senderId: sender._id,
    message: message,
  };
};

export const buildApplicationSuccessMessage = (receiverId, project) => {
  console.log("buildApplicationSuccessMessage: " + project.postedBy._id);
  const message = `Your application for "${project.projectTitle}" has been accepted!`;
  return {
    userId: receiverId,
    senderId: project.postedBy._id,
    message: message,
  };
};

export const buildFileUploadedMessage = (sender, project) => {
  console.log("buildFileUploadedMessage: " + project.postedBy._id);
  const message = `${sender.username} has uploaded their work for "${project.projectTitle}"!`;
  return {
    userId: project.postedBy._id,
    senderId: sender._id,
    message: message,
  };
};

export const buildFileApprovedMessage = (receiver, project) => {
  console.log("buildFileApprovedMessage: " + receiver._id);
  const message = `Your work for "${project.projectTitle}" has been approved. Good Work!`;
  return {
    userId: receiver._id,
    senderId: project.postedBy._id,
    message: message,
  };
};
