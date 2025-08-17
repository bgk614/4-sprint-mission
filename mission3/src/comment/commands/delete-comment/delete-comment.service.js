import prisma from '../../../prisma.js';

export const deleteCommentService = async (commentId) => {
  try {
    return await prisma.comment.delete({
      where: { id: Number(commentId) },
      select: {
        id: true,
        name: true,
        price: true,
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
