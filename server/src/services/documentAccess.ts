import { DocumentModel } from "../models/Document"

export const hasDocumentAccess = async (
  docId: string,
  userId: string
): Promise<boolean> => {
  const doc = await DocumentModel.findById(docId)
  if (!doc) return false

  return (
    doc.owner.toString() === userId ||
    doc.collaborators.some(id => id.toString() === userId)
  )
}
