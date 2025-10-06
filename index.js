import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; 
import heroRoutes from "./routes/heroRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

dotenv.config();

const app = express();
// JSON parsing
app.use(express.json());
// Enable CORS for multiple domains
const allowedOrigins = [
  "http://localhost:5173",
  "https://krid-af-lys.vercel.app",
  "https://studiokal.netlify.app"
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // enable cookies if needed
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", heroRoutes);
app.use("/api", portfolioRoutes);


// Default route
app.get("/", (req, res) => res.send("API is running"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
