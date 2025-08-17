// src/article/queries/list/list-articles.controller.js
import { asyncHandler } from '../../../shared/asyncHandler.js';
import { listArticlesService } from './list-articles.service.js';

export const listArticlesController = asyncHandler(async (req, res) => {
  const articles = await listArticlesService(req.validatedQuery);
  res.json(articles);
});
