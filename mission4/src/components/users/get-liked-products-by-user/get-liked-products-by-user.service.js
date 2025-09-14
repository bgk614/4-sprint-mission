import prisma from '../../../config/prisma.js';

export const getLikedProductsByUserService = async (authorId) => {
  const likes = await prisma.like.findMany({
    where: { authorId, productId: { not: null } },
    include: { product: true },
  });
  return likes.map((like) => like.product);
};
