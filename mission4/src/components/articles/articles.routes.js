import express from 'express';

import { authenticate } from '../../middlewares/authenticate.js';
import { validate } from '../../middlewares/validate.js';
import { createCommentController } from '../comments/create/create-comments.controller.js';
import { createCommentSchema } from '../comments/create/create-comments.schema.js';
import { createArticleController } from './create/create-articles.controller.js';
import { createArticleSchema } from './create/create-articles.schema.js';
import { deleteArticleController } from './delete/delete-articles.controller.js';
import { deleteArticleSchema } from './delete/delete-articles.schema.js';
import { getArticlesController } from './get/get-articles.controller.js';
import { updateArticleController } from './update/update-articles.controller.js';
import { updateArticleSchema } from './update/update-articles.schema.js';

export const articleRouter = express.Router();

articleRouter
  .route('/')
  .post(authenticate, validate(createArticleSchema), createArticleController) // 게시글 등록
  .get(getArticlesController); // 게시글 조회

articleRouter
  .route('/:articleId')
  //   .get() // 게시글 상세 조회
  .patch(authenticate, validate(updateArticleSchema), updateArticleController) // 게시글 수정
  .delete(authenticate, validate(deleteArticleSchema), deleteArticleController); // 게시글 삭제

articleRouter.route('/:articleId/comments').post(authenticate, validate(createCommentSchema), createCommentController); // 게시글 댓글 작성
//   .get(); // 게시글 댓글 조회
