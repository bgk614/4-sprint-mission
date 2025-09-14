import { updateProductService } from './update-products.service.js';

export const updateProductController = async (req, res, next) => {
  try {
    const { productId } = res.locals.validated.params;
    const data = res.locals.validated.body;
    const updatedProduct = await updateProductService(productId, req.user.id, data);

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};
