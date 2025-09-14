import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';

/**
 * 게시글 삭제 서비스
 *
 * @param {Object} params
 * @param {number} params.articleId - 삭제할 게시글 ID
 * @param {number} params.userId - 요청한 사용자 ID
 * @returns {Promise<void>}
 *
 * @throws {AppError} - 게시글 없음(404), 권한 없음(403)
 */
export const deleteArticleService = async ({ articleId, userId }) => {
  const article = await prisma.article.findUnique({ where: { id: articleId } });

  if (!article) {
    throw new AppError('Article not found', 404);
  }

  if (article.authorId !== userId) {
    throw new AppError('Forbidden', 403);
  }

  await prisma.article.delete({
    where: { id: articleId },
  });
};
