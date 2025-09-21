import prisma from '@config/prisma.js';
import { generateTokens, verifyRefreshToken } from '@config/token.js';
import { AppError } from '@utils/app-error.js';

export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken)
    throw new AppError(401, 'UNAUTHORIZED', 'Refresh Token 필요');

  const saved = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });
  if (!saved)
    throw new AppError(401, 'UNAUTHORIZED', '유효하지 않은 Refresh Token');

  const { userId } = verifyRefreshToken(refreshToken);
  const { accessToken } = generateTokens(userId); // 새로운  Token 발급

  return accessToken;
};
