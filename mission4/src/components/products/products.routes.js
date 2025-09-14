// 상품 정보 수정
// 상품 삭제

import express from 'express';

import { authenticate } from '../../middlewares/authenticate.js';
import { validate } from '../../middlewares/validate.js';
import { createProductController } from './create/create-products.controller.js';
import { createProductSchema } from './create/create-products.schema.js';
import { getProductsController } from './get/get-products.controller.js';
import { updateProductController } from './update/update-products.controller.js';
import { updateProductSchema } from './update/update-products.schema.js';

export const productRouter = express.Router();

productRouter
  .route('/')
  .get(authenticate, getProductsController) // 상품 목록 조회
  .post(authenticate, validate(createProductSchema), createProductController); // 상품 등록

productRouter
  .route('/:productId')
  //   .get() // 상품 정보 상세 조회
  .patch(authenticate, validate(updateProductSchema), updateProductController) // 상품 정보 수정
  .delete(); // 상품 삭제

// productRouter
//   .route('/:productId/comments')
//   .post() // 상품 댓글 작성
//   .get(); // 상품 댓글 조회
