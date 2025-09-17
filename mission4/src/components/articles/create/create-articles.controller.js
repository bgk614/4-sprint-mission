import { createArticleService } from './create-articles.service.js';

export const createArticleController = async (req, res, next) => {
  try {
    const { body } = res.locals.validated;

    const article = await createArticleService({
      title: body.title,
      content: body.content,
      authorId: req.user.id,
    });

    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};
