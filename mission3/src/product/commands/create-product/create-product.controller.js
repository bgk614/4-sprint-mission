// create-product.controller.js
import { createProductService } from './index.js';
import { asyncHandler } from '../../../utils/index.js';

export const createProductController = asyncHandler(async (req, res) => {
  const created_product = await createProductService(req.validatedBody);
  res.status(201).json(created_product);
});
