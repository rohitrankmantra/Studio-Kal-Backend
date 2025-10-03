import { uploadPortfolio } from "../config/cloudinary.js";

// Middleware to upload portfolio images
// Accepts two fields:
// 1. thumbnail → single file
// 2. images → multiple files (max 10)
const uploadPortfolioImages = uploadPortfolio.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

export default uploadPortfolioImages;
