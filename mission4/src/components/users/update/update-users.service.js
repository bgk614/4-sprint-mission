import prisma from '../../../config/prisma.js';
import CustomError from '../../../utils/custom-error.js';

/** 로그인한 유저 정보 수정 */
export const updateUserService = async (userId, data) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new CustomError(404, 'NOT_FOUND', '유저를 찾을 수 없습니다.');

  return await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      nickname: true,
      email: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
