import express from 'express';

import {
  createArticleController,
  createArticleSchema,
  getArticleController,
  getArticleSchema,
  listArticlesController,
  listArticlesSchema,
  updateArticleController,
  updateArticleSchema,
  deleteArticleController,
  deleteArticleSchema
} from './commands/index.js';

import {
  listArticleCommentsController,
  listCommentsSchema,
  createCommentController,
  createCommentSchema
} from '../comment/commands/index.js';

import { validateBody, validateQuery, validateParams } from '../utils/index.js';

export const articleRouter = express.Router();

articleRouter
  .route('/')
  .get(validateQuery(listArticlesSchema), listArticlesController)
  .post(validateBody(createArticleSchema), createArticleController);

articleRouter
  .route('/:articleId')
  .get(validateParams(getArticleSchema), getArticleController)
  .patch(
    validateParams(getArticleSchema),
    validateBody(updateArticleSchema),
    updateArticleController
  )
  .delete(validateParams(deleteArticleSchema), deleteArticleController);

articleRouter
  .route('/:articleId/comments')
  .get(
    validateParams(getArticleSchema),
    validateQuery(listCommentsSchema),
    listArticleCommentsController
  )
  .post(validateBody(createCommentSchema), createCommentController);
