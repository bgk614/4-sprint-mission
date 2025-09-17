import { toggleProductLike } from './toggle-products-like.service.js';

export const toggleProductLikeController = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const isLiked = await toggleProductLike(req.user.id, Number(productId));
    res.json({ productId: Number(productId), isLiked });
  } catch (err) {
    next(err);
  }
};
