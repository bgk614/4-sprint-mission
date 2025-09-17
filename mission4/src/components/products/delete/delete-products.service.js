import prisma from '../../../config/prisma.js';
import CustomError from '../../../utils/custom-error.js';

export const deleteProductService = async (productId, userId) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw new CustomError('Product not found', 404);
  }

  if (product.authorId !== userId) {
    throw new CustomError('Forbidden', 403);
  }

  try {
    await prisma.product.delete({ where: { id: productId } });
  } catch (err) {
    if (err.code === 'P2003') {
      throw new CustomError('Cannot delete product due to related records', 400);
    }
    throw new CustomError('Internal server error', 500);
  }

  return { message: 'Product deleted successfully' };
};
