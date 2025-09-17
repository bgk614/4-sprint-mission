import prisma from '../../../config/prisma.js';
import CustomError from '../../../utils/custom-error.js';

/** 로그인한 유저 정보 조회 */
export const getUserService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      nickname: true,
      createdAt: true,
      image: true,
    },
  });

  if (!user) throw new CustomError(404, 'NOT_FOUND', '유저를 찾을 수 없습니다.');

  return user;
};
