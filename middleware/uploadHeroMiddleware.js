import { uploadHero } from "../config/cloudinary.js";

// Middleware to upload single hero image
// Field name should be 'image'
const uploadHeroImage = uploadHero.single("image");

export default uploadHeroImage;
