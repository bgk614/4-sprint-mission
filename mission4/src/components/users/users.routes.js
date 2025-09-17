import express from 'express';

import { authenticate } from '../../middlewares/authenticate.js';
import { validate } from '../../middlewares/validate.js';
import { createUserController } from './create/create-users.controller.js';
import { createUserSchema } from './create/create-users.schema.js';
import { getUserController } from './get/get-users.controller.js';
import { getLikedProductsController } from './get-liked-products-by-user/get-liked-products-by-user.controller.js';
import { getProductsByUserController } from './get-products-by-user/get-products-by-user.controller.js';
import { updateUserController } from './update/update-users.controller.js';
import { updateUserSchema } from './update/update-users.schema.js';
import { updateUserPasswordController } from './update-password/update-users-password.controller.js';
import { updateUserPasswordSchema } from './update-password/update-users-password.schema.js';

export const userRouter = express.Router();

userRouter.route('/').post(validate(createUserSchema), createUserController); // 회원가입

userRouter
  .route('/me')
  .get(authenticate, getUserController) // 유저 본인 조회
  .patch(authenticate, validate(updateUserSchema), updateUserController); // 본인 정보 수정
// .delete(); // 회원 탈퇴

userRouter.route('/me/password').put(authenticate, validate(updateUserPasswordSchema), updateUserPasswordController); // 비밀번호 변경

userRouter.route('/me/products').get(authenticate, getProductsByUserController); // 본인이 등록한 상품 목록 조회
// userRouter.route('/me/articles').get(); // 본인이 등록한 게시글 목록 조회

// userRouter.route('/me/products/comments').get(); // 본인이 작성한 상품 댓글 조회
// userRouter.route('/me/articles/comments').get(); // 본인이 작성한 게시글 댓글 조회

userRouter.route('/me/likes/products').get(authenticate, getLikedProductsController); // 본인이 좋아요 누른 상품 목록
// userRouter.route('/me/likes/articles').get(); // 본인이 좋아요 누른 게시글 목록
