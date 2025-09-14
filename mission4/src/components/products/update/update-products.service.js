import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';

/** 상품 수정 */
export const updateProductService = async (productId, userId, data) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError(404, 'NOT_FOUND', '상품이 존재하지 않습니다.');
  if (product.authorId !== userId) throw new AppError(403, 'FORBIDDEN', '권한이 없습니다.');

  return await prisma.product.update({
    where: { id: productId },
    data,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      updatedAt: true,
    },
  });
};
