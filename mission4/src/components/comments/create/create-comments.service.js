import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';
import { ErrorCodes } from '../../../utils/error-codes.js';

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
  } catch (err) {
    if (err.code === 'P2003') {
      throw new AppError({ ...ErrorCodes.POST_NOT_FOUND, path: 'commentService', details: err.meta });
    }
    throw new AppError({ ...ErrorCodes.INTERNAL, path: 'commentService', details: { originalError: err.message } });
  }
}
