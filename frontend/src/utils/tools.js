export const getRandomAvatar = (username) => {
  return `https://api.dicebear.com/8.x/lorelei/svg?seed=${username}`;
};

export const getAvatar = (user) => {
  if (!user) {
    return getRandomAvatar("anonymous");
  }
  return user.profilePic
    ? `data:${user.profilePic};base64,${user.profilePic}`
    : getRandomAvatar(user.username);
};

export const getAvatarByUsername = (username) => {
  return getRandomAvatar(username);
};
