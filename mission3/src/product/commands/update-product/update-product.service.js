import prisma from '../../../prisma.js';

export const updateProductService = async (productId, updateData) => {
  try {
    return await prisma.product.update({
      where: { id: Number(productId) },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
        updatedAt: true
      }
    });
  } catch (err) {
    if (err.code === 'P2025') {
      return null;
    }
    throw err;
  }
};
