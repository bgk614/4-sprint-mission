import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';

/** 상품 삭제 */
export const deleteProductService = async (productId, userId) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError(404, 'NOT_FOUND', '상품이 존재하지 않습니다.');
  if (product.authorId !== userId) throw new AppError(403, 'FORBIDDEN', '권한이 없습니다.');

  await prisma.product.delete({ where: { id: productId } });
  return { message: '상품이 삭제되었습니다.' };
};
