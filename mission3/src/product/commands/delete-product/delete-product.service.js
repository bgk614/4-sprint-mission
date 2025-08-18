import prisma from '../../../prisma.js';

export const deleteProductService = async (productId) => {
  try {
    return await prisma.product.delete({
      where: { id: Number(productId) },
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true
      }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      // Prisma "Record not found" 에러 코드
      return null;
    }
    throw error;
  }
};
