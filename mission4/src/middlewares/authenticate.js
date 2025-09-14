import { ACCESS_TOKEN_COOKIE_NAME } from '../config/constants.js';
import prisma from '../config/prisma.js';
import { verifyAccessToken } from '../config/token.js';

export async function authenticate(req, _res, next) {
  const token = req.cookies[ACCESS_TOKEN_COOKIE_NAME];
  if (!token) {
    return next(new Error('Unauthorized'));
  }

  try {
    const { userId } = verifyAccessToken(token);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return next(new Error('Unauthorized'));
    }
    req.user = user;
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
}
