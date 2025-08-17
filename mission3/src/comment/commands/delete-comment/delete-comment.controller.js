import { deleteCommentService } from './index.js';
import { AppError } from '../../../utils/index.js';
import { asyncHandler } from '../../../utils/index.js';

export const deleteCommentController = asyncHandler(async (req, res) => {
  const { commentId } = req.validatedParams;
  const comment = await deleteCommentService(commentId);
  if (!comment) throw new AppError('상품을 찾을 수 없음', 404);
  res.status(200).json({ message: '상품 삭제 성공' });
});
