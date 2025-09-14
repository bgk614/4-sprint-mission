import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';

/** 댓글 수정 */
export async function updateCommentService({ commentId, userId, content }) {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new AppError(404, 'NOT_FOUND', '댓글을 찾을 수 없습니다.');
  if (comment.authorId !== userId) throw new AppError(403, 'FORBIDDEN', '본인 댓글만 수정할 수 있습니다.');

  return await prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });
}
