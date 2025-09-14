import { toggleArticleLike } from "./toggle-articles-like.service.js";

export const toggleArticleLikeController = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const isLiked = await toggleArticleLike(req.user.id, Number(articleId));
    res.json({ articleId: Number(articleId), isLiked });
  } catch (err) {
    next(err);
  }
};
