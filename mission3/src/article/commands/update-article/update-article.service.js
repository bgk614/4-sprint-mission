import prisma from '../../../prisma.js';

export const updateArticleService = async (articleId, updateData) => {
  try {
    return await prisma.article.update({
      where: { id: Number(articleId) },
      data: updateData,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true
      }
    });
  } catch (err) {
    if (err.code === 'P2025') {
      return null;
    }
    throw err;
  }
};
