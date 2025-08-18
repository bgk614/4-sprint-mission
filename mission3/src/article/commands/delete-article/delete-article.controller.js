import { deleteArticleService } from './index.js';
import { AppError } from '../../../shared/index.js';
import { asyncHandler } from '../../../shared/index.js';

export const deleteArticleController = asyncHandler(async (req, res) => {
  const { articleId } = req.validatedParams;
  const article = await deleteArticleService(articleId);
  if (!article) throw new AppError('게시글을 찾을 수 없음', 404);
  res.status(200).json({ message: '게시글 삭제 성공' });
});
