import express from "express";
import uploadPortfolioImages from "../middleware/uploadPortfolioMiddleware.js";
import {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js";

const router = express.Router();

// Create a new portfolio
router.post("/portfolio", uploadPortfolioImages, createPortfolio);

// Get all portfolios
router.get("/portfolio", getAllPortfolios);

// Get single portfolio by ID
router.get("/portfolio/:id", getPortfolioById);

// Update portfolio by ID
router.put("/portfolio/:id", uploadPortfolioImages, updatePortfolio);

// Delete portfolio by ID
router.delete("/portfolio/:id", deletePortfolio);

export default router;
