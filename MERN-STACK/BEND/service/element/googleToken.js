import jwt from "jsonwebtoken";

export const googleToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      isGoogle: user.isGoogle,
      isAdmin: user.isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_TIMEOUT }
  );

  const info = {
    token,
    id: user._id,
  };
  return info;
};
