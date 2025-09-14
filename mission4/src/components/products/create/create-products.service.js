import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';

/**
 * 상품 생성
 * @param input 상품 생성 주요 입력값(이름/설명/가격/태그). { name, description, price, tags }
 * @returns 생성된 상품의 주요 필드만 반환
 */

export async function createProductService(input) {
  try {
    return await prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        tags: input.tags,
        author: { connect: { id: input.authorId } },
      },
      select: { id: true, name: true, description: true, price: true, tags: true, authorId: true },
    });
  } catch {
    throw new AppError(404, 'USER_NOT_FOUND', '해당 사용자가 존재하지 않습니다.');
  }
}
