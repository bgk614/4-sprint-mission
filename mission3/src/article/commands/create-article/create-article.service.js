import prisma from '../../../prisma.js';

export const createArticleService = async (articleData) => {
  return await prisma.article.create({
    data: {
      title: articleData.title,
      content: articleData.content
    },
    select: {
      id: true,
      title: true,
      content: true
    }
  });
};
