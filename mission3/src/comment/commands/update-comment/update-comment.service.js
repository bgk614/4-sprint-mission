import prisma from '../../../prisma.js';

export const updateCommentService = async (commentId, updateData) => {
  try {
    return await prisma.comment.update({
      where: { id: Number(commentId) },
      data: updateData,
      select: {
        id: true,
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
