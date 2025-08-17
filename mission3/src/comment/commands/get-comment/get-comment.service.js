import prisma from '../../../prisma.js';

export const getCommentService = async (commentId) => {
  return await prisma.comment.findUnique({
    where: { id: Number(commentId) }
  });
};
