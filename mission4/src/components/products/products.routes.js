// 상품 정보 수정
// 상품 삭제

import express from 'express';

import { authenticate } from '../../middlewares/authenticate.js';
import { validate } from '../../middlewares/validate.js';
import { createCommentController } from '../comments/create/create-comments.controller.js';
import { createCommentSchema } from '../comments/create/create-comments.schema.js';
import { createProductController } from './create/create-products.controller.js';
import { createProductSchema } from './create/create-products.schema.js';
import { deleteProductSchema } from './delete/delete-product.schema.js';
import { deleteProductController } from './delete/delete-products.controller.js';
import { getProductsController } from './get/get-products.controller.js';
import { updateProductController } from './update/update-products.controller.js';
import { updateProductSchema } from './update/update-products.schema.js';

export const productRouter = express.Router();

productRouter
  .route('/')
  .get(getProductsController) // 상품 목록 조회
  .post(authenticate, validate(createProductSchema), createProductController); // 상품 등록

productRouter
  .route('/:productId')
  //   .get() // 상품 정보 상세 조회
  .patch(authenticate, validate(updateProductSchema), updateProductController) // 상품 정보 수정
  .delete(authenticate, validate(deleteProductSchema), deleteProductController); // 상품 삭제

productRouter.route('/:productId/comments').post(authenticate, validate(createCommentSchema), createCommentController); // 게시글 댓글 작성
//   .get(); // 상품 댓글 조회
