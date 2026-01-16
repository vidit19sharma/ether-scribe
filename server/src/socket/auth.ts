import jwt from "jsonwebtoken"

export const verifySocketToken = (token?: string): string | null => {
  if (!token) return null

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string }

    return decoded.id
  } catch {
    return null
  }
}
