import prisma from '../../../config/prisma.js';

/**
 * 로그인 유저가 등록한 상품 목록 조회
 * @param {number} userId - 로그인 유저 ID
 * @returns {Promise<Array>} - 유저가 등록한 상품 배열
 */
export const getProductsByUserService = async (userId) => {
  const products = await prisma.product.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return products;
};
