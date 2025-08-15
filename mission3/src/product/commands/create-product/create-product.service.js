import prisma from '../../../prisma.js';

export const createProductService = async (productData) => {
  return await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      tags: productData.tags || []
    },
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
};
