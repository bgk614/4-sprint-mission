import express from 'express';

export const articleRouter = express.Router();

import { authenticate } from '../../middlewares/authenticate.js';
import { validate } from '../../middlewares/validate.js';
import { createArticleController } from './create/create-articles.controller.js';
import { createArticleSchema } from './create/create-articles.validator.js';

articleRouter
  .route('/')
  // 인증 -> 검증 -> 컨트롤러
  .post(authenticate, validate(createArticleSchema), createArticleController); // 게시글 등록
//   .get(); // 게시글 조회

// articleRouter
//   .route('/:articleId')
//   .get() // 게시글 상세 조회
//   .patch() // 게시글 수정
//   .delete(); // 게시글 삭제

// articleRouter
//   .route('/:articleId/comments')
//   .post() // 게시글 댓글 작성
//   .get(); // 게시글 댓글 조회

// articleRouter.route('/:articleId/likes').post(); // 게시글 좋아요
