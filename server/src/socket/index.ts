import { Server, Socket } from "socket.io"
import { verifySocketToken } from "./auth"
import { hasDocumentAccess } from "../services/documentAccess"

export const setupSocket = (io: Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token
    const userId = verifySocketToken(token)

    if (!userId) {
      return next(new Error("Unauthorized"))
    }

    socket.data.userId = userId
    next()
  })

  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id)

    socket.on("join-document", async (docId: string) => {
      const userId = socket.data.userId

      const hasAccess = await hasDocumentAccess(docId, userId)
      if (!hasAccess) {
        socket.emit("error", "Access denied")
        return
      }

      socket.join(docId)
      console.log(`User ${userId} joined document ${docId}`)
    })
  })
}
