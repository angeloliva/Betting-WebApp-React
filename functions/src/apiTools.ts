import * as admin from "firebase-admin"
import { Request as ExpressRequest, Response, NextFunction } from "express"
import { timingSafeEqual } from "crypto"

interface Request extends ExpressRequest {
  auth?: admin.auth.DecodedIdToken
}

// Very simple token-validation middleware
export const extractAuthInfoMiddleware = async (
  req: Request,
  res: Response,
  next,
) => {
  try {
    // read token from the headers
    const accessToken = extractAccessToken(req)
    req.params.accessToken = accessToken

    // call Firebase to validate the token, and save the auth info
    req.auth = await admin.auth().verifyIdToken(accessToken)

    next()
  } catch (err) {
    invalidTokenResponse(res, err)
  }
}

export const ensureAdminMiddleware = (req: Request, res: Response, next) => {
  const isAdmin = Boolean(req.auth && req.auth.admin)
  if (isAdmin) {
    next()
  } else {
    invalidTokenResponse(
      res,
      new Error("The provided access token has insufficient access rights"),
    )
  }
}

const extractAccessToken = (req: Request) => {
  const authHeader = req.get("Authorization")
  if (!authHeader) {
    throw new Error(
      'Please provide a valid token in the "Authorization" header',
    )
  }
  if (!authHeader.startsWith("Bearer ")) {
    throw new Error(
      'Invalid "Authorization" header: expect "Bearer XXXX" where XXXX is the user ID token',
    )
  }
  return authHeader.slice(7)
}

const invalidTokenResponse = (res: Response, err: Error): Response => {
  return res.status(401).json({
    code: "invalid_access_token",
    error: err.message,
  })
}

// verify a provided access token
export const verifyAuthorizationToken = (accessToken: string) => (
  req: Request,
  res: Response,
  next,
) => {
  const authHeader = req.get("Authorization")
  if (authHeader === accessToken) {
    next()
  } else {
    throw new Error(
      'Invalid "Authorization" header: execpt a valid authorisation token',
    )
  }
}

export function verifyBearerToken(
  tok: string,
): ((req: ExpressRequest, res: Response, next: NextFunction) => void) {
  const want = Buffer.from(tok, "utf-8")
  return (req: ExpressRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn('no "Bearer" Authorization header')
      respondUnauthorized(res, "missing Authorization info")
      return
    }

    // to time-constant compare
    const token = authHeader.slice(7)
    const got = Buffer.from(token, "utf-8")
    if (!timingSafeEqual(got, want)) {
      console.warn('"Bearer" token is invalid')
      respondUnauthorized(res, "invalid Authorization info")
      return
    }

    next()
  }
}

export function respondUnauthorized(res: Response, error: string) {
  res.status(401)
  res.json({ status: "ko", error })
}
