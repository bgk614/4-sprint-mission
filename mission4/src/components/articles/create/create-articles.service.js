import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';

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
  } catch {
    throw new AppError(404, 'USER_NOT_FOUND', '해당 사용자가 존재하지 않습니다.');
  }
}
