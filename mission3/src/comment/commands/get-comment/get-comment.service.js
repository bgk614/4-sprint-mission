import prisma from '../../../prisma.js';

export const getCommentService = async (id) => {
  return await prisma.comment.findUnique({
    where: { id: Number(id) }
  });
};
