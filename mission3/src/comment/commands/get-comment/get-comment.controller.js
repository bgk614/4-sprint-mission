import { getCommentService } from './get-comment.service.js';
import { AppError } from '../../../utils/AppError.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getCommentController = asyncHandler(async (req, res) => {
  const { commentId } = req.validatedParams;
  const comment = await getCommentService(commentId);
  if (!comment) throw new AppError('댓글을 찾을 수 없음', 404);
  res.json(comment);
});
