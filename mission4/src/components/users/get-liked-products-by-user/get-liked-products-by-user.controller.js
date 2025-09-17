import { getLikedProductsByUserService } from './get-liked-products-by-user.service.js';

export const getLikedProductsController = async (req, res, next) => {
  try {
    const products = await getLikedProductsByUserService(req.user.id);
    res.json({ products });
  } catch (err) {
    next(err);
  }
};
