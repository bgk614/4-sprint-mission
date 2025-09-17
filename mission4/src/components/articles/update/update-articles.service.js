import prisma from '../../../config/prisma.js';
import CustomError from '../../../utils/custom-error.js';

/**
 * 게시글 수정 서비스
 *
 * @param {Object} params
 * @param {number} params.articleId - 수정할 게시글 ID
 * @param {number} params.userId - 요청한 사용자 ID
 * @param {string} params.title - 수정할 제목
 * @param {string} params.content - 수정할 내용
 * @returns {Promise<Object>} - 수정된 게시글
 *
 * @throws {CuntomError} - 게시글 없음(404), 권한 없음(403)
 */
export const updateArticleService = async ({ articleId, userId, title, content }) => {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    throw new CustomError('Article not found', 404);
  }

  if (article.authorId !== userId) {
    throw new CustomError('Forbidden', 403);
  }

  return prisma.article.update({
    where: { id: articleId },
    data: {
      title,
      content,
    },
  });
};
