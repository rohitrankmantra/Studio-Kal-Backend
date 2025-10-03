import express from "express";
import uploadHeroImage from "../middleware/uploadHeroMiddleware.js";
import { getHeroImage, updateHeroImage } from "../controllers/heroController.js";

const router = express.Router();

// Get current hero image
router.get("/hero", getHeroImage);

// Update hero image (single file upload)
router.put("/hero", uploadHeroImage, updateHeroImage);

export default router;
