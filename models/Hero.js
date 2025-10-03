import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
