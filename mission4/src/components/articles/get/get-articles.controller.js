import { getArticlesService } from './get-articles.service.js';

export const getArticlesController = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const articles = await getArticlesService(userId);
    res.status(200).json({ articles });
  } catch (err) {
    next(err);
  }
};
