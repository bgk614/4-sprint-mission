import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';

/**
 * 댓글 생성
 * @param input 댓글 생성 입력값. { content, authorId, articleId?, productId? }
 * @returns 생성된 댓글의 주요 필드만 반환
 */
export async function createCommentService(input) {
  const { content, authorId, articleId, productId } = input;

  try {
    return await prisma.comment.create({
      data: {
        content,
        author: { connect: { id: authorId } },
        article: articleId ? { connect: { id: articleId } } : undefined,
        product: productId ? { connect: { id: productId } } : undefined,
      },
      select: {
        id: true,
        content: true,
        authorId: true,
        articleId: true,
        productId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch {
    throw new AppError(404, 'NOT_FOUND', '댓글을 생성할 수 없습니다. 대상이 존재하지 않거나 잘못된 요청입니다.');
  }
}
