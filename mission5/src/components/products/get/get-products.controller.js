import { getProductsService } from './get-products.service.js';

export const getProductsController = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const products = await getProductsService(userId);
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};
