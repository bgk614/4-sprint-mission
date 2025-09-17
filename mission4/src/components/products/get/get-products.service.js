import prisma from '../../../config/prisma.js';

/**
 * 모든 상품 조회 (isLiked 포함)
 * @param {number} userId - 로그인한 유저 ID
 * @returns 상품 배열
 */

export const getProductsService = async (userId) => {
  const products = await prisma.product.findMany({
    include: {
      likes: {
        where: { authorId: userId }, // 로그인 유저 기준
      },
      author: true, // 작성자 정보 포함
    },
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    tags: product.tags,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    authorId: product.authorId,
    author: product.author,
    isLiked: product.likes.length > 0,
  }));
};
