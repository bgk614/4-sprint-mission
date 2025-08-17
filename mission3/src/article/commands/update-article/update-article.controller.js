import { asyncHandler } from '../../../shared/asyncHandler.js';
import { AppError } from '../../../shared/AppError.js';
import { updateArticleService } from './update-article.service.js';

export const updateArticleController = asyncHandler(async (req, res) => {
  const updated = await updateArticleService(
    req.validatedParams.id,
    req.validatedBody
  );

  if (!updated) throw new AppError('게시글을 찾을 수 없음', 404);

  res.json(updated);
});
