import { getArticleService } from './get-article.service.js';
import { AppError } from '../../../utils/AppError.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getArticleController = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;
  const article = await getArticleService(id);
  if (!article) throw new AppError('게시글을 찾을 수 없음', 404);
  res.json(article);
});
