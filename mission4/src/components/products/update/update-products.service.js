import prisma from '../../../config/prisma.js';
import CustomError from '../../../utils/custom-error.js';

/**
 * 상품 수정 서비스
 * @param {number} productId
 * @param {number} userId
 * @param {object} data
 * @returns {Promise<object>}
 */
export const updateProductService = async (productId, userId, data) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      throw new CustomError('Product not found', 404);
    }

    if (product.authorId !== userId) {
      throw new CustomError('Forbidden', 403);
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
    if (err.code && err.code.startsWith('P')) {
      throw new CustomError('Database constraint error', 400);
    }

    if (err instanceof CustomError) throw err;

    throw new CustomError('Internal server error', 500);
  }
};
