import prisma from '../../../prisma.js';

export const getProductService = async (id) => {
  return await prisma.product.findUnique({
    where: { id: Number(id) }
  });
};
