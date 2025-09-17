import prisma from '../../../config/prisma.js';
import CustomError from '../../../utils/custom-error.js';

/**
 * 상품 생성
 * @param input 상품 생성 주요 입력값(이름/설명/가격/태그). { name, description, price, tags }
 * @returns 생성된 상품의 주요 필드만 반환
 */

export async function createProductService(input) {
  if (!input.name?.trim()) {
    throw new CustomError('Product name is required', 400);
  }

  if (input.price <= 0) {
    throw new CustomError('Product price must be greater than zero', 400);
  }

  return prisma.product.create({
    data: {
      name: input.name,
      description: input.description,
      price: input.price,
      tags: input.tags,
      author: { connect: { id: input.authorId } },
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      authorId: true,
    },
  });
}
