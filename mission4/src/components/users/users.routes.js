import express from 'express';

import { createUserController } from './create/create-users.controller.js';

export const userRouter = express.Router();

userRouter.route('/').post(createUserController); // 회원가입

userRouter.route('/me');
// .get() // 유저 본인 조회
// .patch() // 본인 정보 수정
// .delete(); // 회원 탈퇴

// userRouter.route('/me/password').patch(); // 비밀번호 변경

// userRouter.route('/me/products').get(); // 본인이 등록한 상품 목록 조회
// userRouter.route('/me/articles').get(); // 본인이 등록한 게시글 목록 조회

// userRouter.route('/me/products/comments').get(); // 본인이 작성한 상품 댓글 조회
// userRouter.route('/me/articles/comments').get(); // 본인이 작성한 게시글 댓글 조회

// userRouter.route('/me/likes/products').get(); // 본인이 좋아요 누른 상품 목록
// userRouter.route('/me/likes/articles').get(); // 본인이 좋아요 누른 게시글 목록
