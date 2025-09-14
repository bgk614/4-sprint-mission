import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';
import { ErrorCodes } from '../../../utils/error-codes.js';

export async function updateCommentService({ commentId, userId, content }) {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new AppError({ ...ErrorCodes.COMMENT_NOT_FOUND });
  if (comment.authorId !== userId) throw new AppError({ ...ErrorCodes.FORBIDDEN });

  return prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });
}
