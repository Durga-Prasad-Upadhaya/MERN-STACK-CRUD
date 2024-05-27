import express from "express";
import { deleteAFeedback, fetchAFeedback, fetchFeedback, mailService } from "../service/mailService.js";
import { validateToken } from "../middleware/validateToken.js";

const router = express.Router();
router.post("/", mailService);
router.get("/", validateToken, fetchFeedback);
router.get("/:id", validateToken, fetchAFeedback);
router.delete("/:id", validateToken, deleteAFeedback);
export default router;
