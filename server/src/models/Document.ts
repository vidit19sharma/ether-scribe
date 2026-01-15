import mongoose, { Document as MongooseDocument } from "mongoose"

export interface IDocument extends MongooseDocument {
  title: string
  owner: mongoose.Types.ObjectId
  collaborators: mongoose.Types.ObjectId[]
  content: Buffer | null
}

const documentSchema = new mongoose.Schema<IDocument>(
  {
    title: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    content: {
      type: Buffer,
      default: null
    }
  },
  { timestamps: true }
)

export const DocumentModel = mongoose.model<IDocument>(
  "Document",
  documentSchema
)
