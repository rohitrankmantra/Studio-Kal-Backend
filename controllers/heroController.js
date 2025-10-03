import Hero from "../models/Hero.js";
import { cloudinary } from "../config/cloudinary.js";

// Get current hero image
export const getHeroImage = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ message: "No hero image found." });
    }
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update hero image
export const updateHeroImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    // Get uploaded file info from multer + Cloudinary
    const { path: imageUrl, filename: public_id } = req.file;

    // Check if a hero image already exists
    const existingHero = await Hero.findOne();

    if (existingHero) {
      // Delete old image from Cloudinary
      await cloudinary.v2.uploader.destroy(existingHero.public_id);
      
      // Update the existing document
      existingHero.imageUrl = imageUrl;
      existingHero.public_id = public_id;
      await existingHero.save();

      return res.status(200).json({ message: "Hero image updated.", hero: existingHero });
    }

    // If no existing hero, create new
    const hero = await Hero.create({ imageUrl, public_id });
    res.status(201).json({ message: "Hero image uploaded.", hero });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
