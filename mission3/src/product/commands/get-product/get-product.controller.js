import { getProductService } from './get-product.service.js';
import { AppError } from '../../../utils/AppError.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getProductController = asyncHandler(async (req, res) => {
  const { productId } = req.validatedParams;
  const product = await getProductService(productId);
  if (!product) throw new AppError('상품을 찾을 수 없음', 404);
  res.json(product);
});
