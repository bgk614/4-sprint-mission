import prisma from '../../../prisma.js';

export const getProductService = async (productId) => {
  return await prisma.product.findUnique({
    where: { id: Number(productId) }
  });
};
