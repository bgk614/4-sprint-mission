import prisma from '../../../prisma.js';

export const listCommentsService = async ({
  targetType,
  targetId,
  cursor,
  limit
}) => {
  const where =
    targetType === 'product'
      ? { productId: targetId }
      : { articleId: targetId };

  return await prisma.userComment.findMany({
    where,
    take: limit,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    orderBy: { id: 'desc' },
    select: { id: true, content: true, createdAt: true }
  });
};
