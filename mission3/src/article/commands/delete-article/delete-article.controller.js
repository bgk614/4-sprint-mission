import { deleteArticleService } from './index.js';
import { AppError } from '../../../utils/index.js';
import { asyncHandler } from '../../../utils/index.js';

export const deleteArticleController = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;
  const article = await deleteArticleService(id);
  if (!article) throw new AppError('게시글을 찾을 수 없음', 404);
  res.status(200).json({ message: '게시글 삭제 성공' });
});
