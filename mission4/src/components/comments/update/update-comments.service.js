import prisma from '../../../config/prisma.js';
import CustomError from '../../../utils/custom-error.js';

export async function updateCommentService({ commentId, userId, content }) {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new CustomError('Comment not found', 404);
  }

  if (comment.authorId !== userId) {
    throw new CustomError('Forbidden', 403);
  }

  return prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });
}
