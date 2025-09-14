import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';
import { ErrorCodes } from '../../../utils/error-codes.js';

/**
 * 게시글 생성
 * @param input 게시글 생성 입력값(제목/내용/작성자). { title, content, authorId }
 * @returns 생성된 게시글의 주요 필드만 반환
 */

export async function createArticleService(input) {
  try {
    return await prisma.article.create({
      data: {
        title: input.title,
        content: input.content,
        author: { connect: { id: input.authorId } },
      },
      select: { id: true, title: true, content: true, authorId: true },
    });
  } catch (err) {
    // Prisma 에러 매핑
    if (err.code === 'P2025') {
      // 연결할 유저가 없을 때
      throw new AppError({ ...ErrorCodes.USER_NOT_FOUND, details: err.meta });
    }
    // 그 외 에러는 그대로 던짐 → 전역 errorHandler에서 처리
    throw err;
  }
}
