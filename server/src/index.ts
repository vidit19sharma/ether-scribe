// Import Statements
import dotenv from "dotenv"

import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import { connectDB } from "./config/db"
import authRoutes from "./routes/auth"
import documentRoutes from "./routes/document"

import { setupSocket } from "./socket"

// for enviornment Variables
dotenv.config()

// For Database
connectDB()

// main server
const app = express()

//middlewares
app.use(cors())
app.use(express.json())


// routes
app.get("/health", (_, res) => {res.json({ status: "ok" })})
app.use("/api/auth", authRoutes)
app.use("/api/documents", documentRoutes)


//cant use socket.io on express need http server
const server = http.createServer(app)


const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

setupSocket(io)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})