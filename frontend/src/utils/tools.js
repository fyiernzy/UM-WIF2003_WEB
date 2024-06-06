export const getRandomAvatar = (username) => {
  return `https://api.dicebear.com/8.x/lorelei/svg?seed=${username}`;
};

export const getAvatar = (user) => {
  if (!user) {
    throw new Error("NullUserError: user in getAvatar cannot be null.");
  }
  return user.profilePic
    ? `data:${user.profilePic};base64,${user.profilePic}`
    : getRandomAvatar(user.username);
};
