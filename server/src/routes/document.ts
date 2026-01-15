import { Router } from "express"
import { DocumentModel } from "../models/Document"
import { authMiddleware, AuthRequest } from "../middleware/auth"

const router = Router()

// Create document
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const doc = await DocumentModel.create({
    title: "Untitled Document",
    owner: req.userId,
    collaborators: [],
    content: null
  })

  res.json(doc)
})

// Get document
router.get("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const doc = await DocumentModel.findById(req.params.id)

  if (!doc)
    return res.status(404).json({ message: "Document not found" })

  const hasAccess =
    doc.owner.toString() === req.userId ||
    doc.collaborators.some(id => id.toString() === req.userId)

  if (!hasAccess)
    return res.status(403).json({ message: "Access denied" })

  res.json(doc)
})

export default router
