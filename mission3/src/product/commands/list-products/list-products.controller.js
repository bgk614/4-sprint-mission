// src/product/queries/list/list-products.controller.js
import { asyncHandler } from '../../../utils/asyncHandler.js';
import { listProductsService } from './list-products.service.js';

export const listProductsController = asyncHandler(async (req, res) => {
  const products = await listProductsService(req.validatedQuery);
  res.json(products);
});
