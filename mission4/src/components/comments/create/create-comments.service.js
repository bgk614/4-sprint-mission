import prisma from '../../../config/prisma.js';
import CustomError from '../../../utils/custom-error.js';

export async function createCommentService(input) {
  const { content, authorId, articleId, productId } = input;

  if (!content?.trim()) {
    throw new CustomError('Content cannot be empty', 400);
  }

  return prisma.comment.create({
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
}
