import prisma from '../config/prisma.js';
import { verifyAccessToken } from '../config/token.js';
import CustomError from '../utils/custom-error.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new CustomError('토큰이 필요합니다.', 401);
    }

    const token = authHeader.split(' ')[1];
    const { userId } = verifyAccessToken(token);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new CustomError('유효하지 않은 토큰입니다.', 401);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
