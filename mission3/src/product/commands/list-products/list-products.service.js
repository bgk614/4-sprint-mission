import prisma from '../../../prisma.js';

export const listProductsService = async ({
  offset = 0,
  limit = 10,
  sort,
  search
}) => {
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }
    : {};

  const orderBy =
    sort === 'recent' ? { createdAt: 'desc' } : { createdAt: 'asc' };

  return await prisma.product.findMany({
    where,
    orderBy,
    skip: offset,
    take: limit,
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true
    }
  });
};
