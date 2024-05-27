import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) res.status(401).json({ message: "Unauthorized Token!" });
      else {
        req.user = decoded.user;
        next();
      }
    });
  } else res.status(401).json({ message: "No Authorization Token Found" });
});
