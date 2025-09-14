import { AppError } from '../../../utils/app-error.js';
import { ErrorCodes } from '../../../utils/error-codes.js';
import { createCommentService } from './create-comments.service.js';

export const createCommentController = async (req, res, next) => {
  try {
    if (!req.user) throw new AppError({ ...ErrorCodes.UNAUTHORIZED, path: req.originalUrl });

    const { body, params } = res.locals.validated;

    const comment = await createCommentService({
      content: body.content,
      authorId: req.user.id,
      articleId: params.articleId || null,
      productId: params.productId || null,
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};
