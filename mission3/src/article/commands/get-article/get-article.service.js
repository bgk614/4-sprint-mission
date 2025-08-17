import prisma from '../../../prisma.js';

export const getArticleService = async (id) => {
  return await prisma.article.findUnique({
    where: { id: Number(id) }
  });
};
