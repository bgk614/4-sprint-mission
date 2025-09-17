import prisma from '../../../config/prisma.js';
import CustomError from '../../../utils/custom-error.js';

/**
 * 댓글 삭제 서비스
 *
 * @param {Object} params
 * @param {number} params.commentId - 삭제할 게시글 ID
 * @param {number} params.userId - 요청한 사용자 ID
 * @returns {Promise<void>}
 *
 * @throws {CustomError} - 게시글 없음(404), 권한 없음(403)
 */

export const deleteCommentService = async ({ commentId, userId }) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new CustomError('Comment not found', 404);
  if (comment.authorId !== userId) throw new CustomError('Forbidden', '본인 댓글만 삭제할 수 있습니다.', 403);

  return await prisma.comment.delete({ where: { id: commentId } });
};
