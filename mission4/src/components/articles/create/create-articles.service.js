import prisma from '../../../config/prisma.js';

/**
 * 게시글 생성
 * @param {Object} input - 게시글 생성 입력값 { title, content, authorId }
 * @returns {Promise<Object>} - 생성된 게시글의 주요 필드 반환
 */

export async function createArticleService(input) {
  return prisma.article.create({
    data: {
      title: input.title,
      content: input.content,
      author: { connect: { id: input.authorId } },
    },
    select: { id: true, title: true, content: true, authorId: true },
  });
}
