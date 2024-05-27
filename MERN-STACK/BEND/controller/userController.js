import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  fetchAUser,
  fetchUsers,
  deleteUser,
} from "../service/userService.js";
import { validateToken } from "../middleware/validateToken.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", validateToken, fetchUsers);
router.get("/:id", validateToken, fetchAUser);
router.delete("/:id", validateToken, deleteUser);

export default router;
