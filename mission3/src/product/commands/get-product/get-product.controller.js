import { getProductService } from './get-product.service.js';
import { AppError } from '../../../utils/AppError.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getProductController = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;
  const product = await getProductService(id);
  if (!product) throw new AppError('상품을 찾을 수 없음', 404);
  res.json(product);
});
