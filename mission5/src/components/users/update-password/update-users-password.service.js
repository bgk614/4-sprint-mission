import bcrypt from 'bcrypt';

import prisma from '../../../config/prisma.js';
import CustomError from '../../../utils/custom-error.js';

/** 로그인 유저 비밀번호 변경 */
export const updateUserPasswordService = async (userId, currentPassword, newPassword) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new CustomError(404, 'NOT_FOUND', '유저를 찾을 수 없습니다.');

  // 현재 비밀번호 검증
  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) throw new CustomError(400, 'INVALID_PASSWORD', '현재 비밀번호가 올바르지 않습니다.');

  // 새 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
    select: { id: true, email: true, updatedAt: true },
  });
};
