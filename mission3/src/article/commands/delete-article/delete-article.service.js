import prisma from '../../../prisma.js';

export const deleteArticleService = async (articleId) => {
  try {
    return await prisma.article.delete({
      where: { id: Number(articleId) },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true
      }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
};
