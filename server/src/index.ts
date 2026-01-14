// Import Statements
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db"
import authRoutes from "./routes/auth"

// for enviornment Variables
dotenv.config()

// For Database
connectDB()

// main server
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)

// routes
app.get("/health", (_, res) => {
  res.json({ status: "ok" })
})

// starting server
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
