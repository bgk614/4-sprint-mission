import express from 'express';

import { authenticate } from '../../middlewares/authenticate.js';
import { validate } from '../../middlewares/validate.js';
import { deleteCommentController } from './delete/delete-comments.controller.js';
import { deleteCommentSchema } from './delete/delete-comments.schema.js';
import { updateCommentController } from './update/update-comments.controller.js';
import { updateCommentSchema } from './update/update-comments.schema.js';

export const commentRouter = express.Router();

commentRouter
  .route('/:commentId')
  .patch(authenticate, validate(updateCommentSchema), updateCommentController) // 댓글 수정
  .delete(authenticate, validate(deleteCommentSchema), deleteCommentController); // 댓글 삭제
