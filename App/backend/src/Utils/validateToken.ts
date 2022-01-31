import * as jwt from 'jsonwebtoken'

export function validateToken(token: any, role: Array<string>): any {
  try {
    if (!token.token) {
      return false
    }
    const decodedToken: any = jwt.verify(token.token, process.env.SECRET)
    if (!token || !decodedToken.ID) {
      return false
    }
    if (role.includes(decodedToken.Role)) {
      return true
    }
    return false
  } catch {
    return false
  }
}
