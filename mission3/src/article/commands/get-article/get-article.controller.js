import { getArticleService } from './get-article.service.js';
import { AppError } from '../../../shared/AppError.js';
import { asyncHandler } from '../../../shared/asyncHandler.js';

export const getArticleController = asyncHandler(async (req, res) => {
  const { articleId } = req.validatedParams;
  const article = await getArticleService(articleId);
  if (!article) throw new AppError('게시글을 찾을 수 없음', 404);
  res.json(article);
});
