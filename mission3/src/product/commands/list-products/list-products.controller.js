import { asyncHandler } from '../../../shared/asyncHandler.js';
import { listProductsService } from './list-products.service.js';

export const listProductsController = asyncHandler(async (req, res) => {
  const products = await listProductsService(req.validatedQuery);
  res.json(products);
});
