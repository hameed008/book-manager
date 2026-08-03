// 1. THIS MUST BE THE VERY FIRST IMPORT
import "dotenv/config";

import express from "express";
import { connectDB } from "./config/db.js"
import { seedDatabase } from "./seed.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import dns from "node:dns";

const app = express();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = process.env.PORT || 8000;

// Connect Database
const DATABASE_NAME = process.env.DB_NAME
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

await connectDB(USERNAME, PASSWORD, DATABASE_NAME);
// await seedDatabase()

// Parse Json
app.use(express.json({ extended: false }))

// Sign cookies using cookie parser
app.use(cookieParser(process.env.SESSION_SECRET))

// Allow both localhost (for local testing) and your Vercel live site
const allowedOrigins = [
  process.env.FRONTEND_API,
  "http://localhost:3000"
].filter(Boolean); // This prevents errors if FRONTEND_URL is missing locally

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use("/", userRoutes);
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

//? Global Error Handling
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).json({ error: "Something went wrong!" })
});

app.listen(PORT, () => {
  console.log("Server Running on port " + PORT)
});