import express from 'express';

import {
  createCommentController,
  getCommentController,
  listArticleCommentsController,
  listProductCommentsController,
  updateCommentController,
  deleteCommentController,
  createCommentSchema,
  getCommentSchema,
  listCommentsSchema,
  updateCommentSchema,
  deleteCommentSchema
} from './commands/index.js';

import { validateBody, validateQuery, validateParams } from '../utils/index.js';

export const commentRouter = express.Router();

commentRouter
  .route('/:id')
  .patch(
    validateParams(getCommentSchema),
    validateBody(updateCommentSchema),
    updateCommentController
  )
  .delete(validateParams(deleteCommentSchema), deleteCommentController);
