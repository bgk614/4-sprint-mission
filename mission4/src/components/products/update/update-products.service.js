import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';
import { ErrorCodes } from '../../../utils/error-codes.js';
import { mapPrismaError } from '../../../utils/prisma-error-mapper.js';

/**
 * 상품 수정 서비스
 * @param {number} productId - 수정할 상품 ID
 * @param {number} userId - 요청한 유저 ID
 * @param {object} data - 수정 데이터
 * @returns {Promise<object>} - 수정된 상품
 */
export const updateProductService = async (productId, userId, data) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      throw new AppError({ ...ErrorCodes.PRODUCT_NOT_FOUND, path: `/products/${productId}` });
    }

    if (product.authorId !== userId) {
      throw new AppError({ ...ErrorCodes.FORBIDDEN, path: `/products/${productId}` });
    }

    const updated = await prisma.product.update({
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

    return updated;
  } catch (err) {
    // Prisma 에러를 AppError로 변환
    if (err.code && err.code.startsWith('P')) {
      throw mapPrismaError(err, `/products/${productId}`);
    }

    // 이미 AppError라면 그대로 throw
    if (err instanceof AppError) throw err;

    // 그 외 알 수 없는 에러는 500으로
    throw new AppError({
      ...ErrorCodes.INTERNAL,
      path: `/products/${productId}`,
      details: { originalError: err.message, stack: err.stack },
    });
  }
};
