import { getProductsByUserService } from './get-products-by-user.service.js';

export const getProductsByUserController = async (req, res, next) => {
  try {
    const products = await getProductsByUserService(req.user.id);

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};
