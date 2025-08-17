import express from 'express';

import {
  createProductController,
  createProductSchema,
  getProductController,
  getProductSchema,
  listProductsController,
  listProductsSchema,
  updateProductController,
  updateProductSchema,
  deleteProductController,
  deleteProductSchema
} from './commands/index.js';

import {
  listProductCommentsController,
  createCommentController,
  createCommentSchema,
  listCommentsSchema
} from '../comment/commands/index.js';

import { validateBody, validateQuery, validateParams } from '../utils/index.js';

export const productRouter = express.Router();

productRouter
  .route('/')
  .get(validateQuery(listProductsSchema), listProductsController)
  .post(validateBody(createProductSchema), createProductController);

productRouter
  .route('/:id')
  .get(validateParams(getProductSchema), getProductController)
  .patch(
    validateParams(getProductSchema),
    validateBody(updateProductSchema),
    updateProductController
  )
  .delete(validateParams(deleteProductSchema), deleteProductController);

  productRouter
    .route('/:id/comments')
    .get(
      validateParams(getProductSchema),
      validateQuery(listCommentsSchema), 
      listProductCommentsController
    )
    .post(validateBody(createCommentSchema), createCommentController);