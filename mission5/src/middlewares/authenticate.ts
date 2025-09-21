import type { NextFunction, Request, Response } from 'express';
import prisma from '../config/prisma.js';
import { verifyAccessToken } from '../config/token.js';

interface JwtPayload {
  userId: number;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      nickname?: string;
      image?: string | null;
    }
    interface Request {
      user: User;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) token = authHeader.split(' ')[1];

    if (!token && req.cookies?.accessToken) token = req.cookies.accessToken;

    if (!token) {
      res.status(401).json({ message: '토큰이 필요합니다.' });
      return;
    }

    const payload = verifyAccessToken(token) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
      return;
    }

    req.user = user;
    next();
  } catch (err: any) {
    res.status(401).json({ message: '인증 실패', error: err.message });
  }
};
