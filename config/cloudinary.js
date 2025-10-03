import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for Hero Image (single image)
const heroStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "StudioKal/HeroImages",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Storage for Portfolio Images
const portfolioStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "StudioKal/PortfolioImages",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Multer upload instances
const uploadHero = multer({ storage: heroStorage });
const uploadPortfolio = multer({ storage: portfolioStorage });

export { cloudinary, uploadHero, uploadPortfolio };
