import { createArticleService } from './index.js';
import { asyncHandler } from '../../../shared/index.js';

export const createArticleController = asyncHandler(async (req, res) => {
  const created_article = await createArticleService(req.validatedBody);
  res.status(201).json(created_article);
});
