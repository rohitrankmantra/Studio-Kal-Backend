import Portfolio from "../models/Portfolio.js";
import { cloudinary } from "../config/cloudinary.js";

// Create a new portfolio project
export const createPortfolio = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files || !req.files.thumbnail) {
      return res.status(400).json({ message: "Thumbnail is required." });
    }

    // Thumbnail file
    const thumbnailFile = req.files.thumbnail[0];
    const thumbnail = {
      imageUrl: thumbnailFile.path,
      public_id: thumbnailFile.filename,
    };

    // Multiple portfolio images
    let images = [];
    if (req.files.images) {
      images = req.files.images.map((file) => ({
        imageUrl: file.path,
        public_id: file.filename,
      }));
    }

    const portfolio = await Portfolio.create({
      title,
      description,
      thumbnail,
      images,
    });

    res.status(201).json({ message: "Portfolio created.", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all portfolio projects
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get single project by ID
export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found." });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update portfolio project
export const updatePortfolio = async (req, res) => {
  try {
    const { title, description } = req.body;
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found." });
    }

    // Update title/description if provided
    if (title) portfolio.title = title;
    if (description) portfolio.description = description;

    // Update thumbnail if uploaded
    if (req.files && req.files.thumbnail) {
      // Delete old thumbnail
      await cloudinary.v2.uploader.destroy(portfolio.thumbnail.public_id);

      const thumbnailFile = req.files.thumbnail[0];
      portfolio.thumbnail = {
        imageUrl: thumbnailFile.path,
        public_id: thumbnailFile.filename,
      };
    }

    // Update portfolio images if uploaded
    if (req.files && req.files.images) {
      // Delete old images from Cloudinary
      for (const img of portfolio.images) {
        await cloudinary.v2.uploader.destroy(img.public_id);
      }

      portfolio.images = req.files.images.map((file) => ({
        imageUrl: file.path,
        public_id: file.filename,
      }));
    }

    await portfolio.save();
    res.status(200).json({ message: "Portfolio updated.", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete portfolio project
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found." });
    }

    // Delete thumbnail from Cloudinary
    await cloudinary.v2.uploader.destroy(portfolio.thumbnail.public_id);

    // Delete all portfolio images from Cloudinary
    for (const img of portfolio.images) {
      await cloudinary.v2.uploader.destroy(img.public_id);
    }

    await portfolio.remove();
    res.status(200).json({ message: "Portfolio deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
