import prisma from '../../../prisma.js';

export const getArticleService = async (articleId) => {
  return await prisma.article.findUnique({
    where: { id: Number(articleId) }
  });
};
