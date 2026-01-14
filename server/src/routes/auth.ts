import { Router } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "../models/User"

const router = Router()

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser)
    return res.status(400).json({ message: "User exists" })

  const user = await User.create({ name, email, password })

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  )

  res.json({ token })
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" })

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  )

  res.json({ token })
})

export default router
