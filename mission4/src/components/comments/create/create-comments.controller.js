import { createCommentService } from './create-comments.service.js';

export const createCommentController = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { content, articleId, productId } = res.locals.validated;

    const comment = await createCommentService({
      content,
      authorId: req.user.id,
      articleId: articleId || null,
      productId: productId || null,
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};
