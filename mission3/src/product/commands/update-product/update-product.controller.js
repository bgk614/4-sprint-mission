// src/product/commands/update/update-product.controller.js
import { asyncHandler } from '../../../utils/asyncHandler.js';
import { AppError } from '../../../utils/AppError.js';
import { updateProductService } from './update-product.service.js';

export const updateProductController = asyncHandler(async (req, res) => {
  const updated = await updateProductService(req.validatedParams.id, req.validatedBody);

  if (!updated) throw new AppError('상품을 찾을 수 없음', 404);

  res.json(updated);
});
