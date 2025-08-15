import express from 'express';

import {
  // createArticleController,
  // createArticleSchema,
  getArticleController,
  getArticleSchema,
  listArticlesController,
  listArticlesSchema
  // updateArticleController,
  // updateArticleSchema,
  // deleteArticleController,
  // deleteArticleSchema
} from './commands/index.js';

import { validateBody, validateQuery, validateParams } from '../utils/index.js';

export const articleRouter = express.Router();

articleRouter.route('/').get(validateQuery(listArticlesSchema), listArticlesController);
// .post(validateBody(createArticleSchema), createArticleController);

articleRouter.route('/:id').get(validateParams(getArticleSchema), getArticleController);
// .patch(validateParams(getArticleSchema), validateBody(updateArticleSchema), updateArticleController)
// .delete(validateParams(deleteArticleSchema), deleteArticleController);
