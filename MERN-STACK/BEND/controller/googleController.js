import { Router } from "express";
import {
  deleteAGoogleUser,
  fetchAGoogleUser,
  fetchAllGoogleUsers,
  googleLogin,
} from "../service/googleService.js";
import { validateToken } from "../middleware/validateToken.js";
const router = Router();

router.get("/google", googleLogin);
router.get("/googleUsers", validateToken, fetchAllGoogleUsers);
router.get("/googleUsers/:id", validateToken, fetchAGoogleUser);
router.delete("/:id", validateToken, deleteAGoogleUser);

export default router;
