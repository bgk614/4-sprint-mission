import prisma from '../../../prisma.js';

export const listArticlesService = async ({
  offset = 0,
  limit = 10,
  sort,
  search
}) => {
  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } }
        ]
      }
    : {};

  const orderBy =
    sort === 'recent' ? { createdAt: 'desc' } : { createdAt: 'asc' };

  return await prisma.article.findMany({
    where,
    orderBy,
    skip: offset,
    take: limit,
    select: {
      id: true,
      title: true,
      createdAt: true
    }
  });
};
