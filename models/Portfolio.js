import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      imageUrl: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    images: [
      {
        imageUrl: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
