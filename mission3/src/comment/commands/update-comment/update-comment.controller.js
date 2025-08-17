// src/comment/commands/update/update-comment.controller.js
import { asyncHandler } from '../../../utils/asyncHandler.js';
import { AppError } from '../../../utils/AppError.js';
import { updateCommentService } from './update-comment.service.js';

export const updateCommentController = asyncHandler(async (req, res) => {
  const updated = await updateCommentService(
    req.validatedParams.id,
    req.validatedBody
  );

  if (!updated) throw new AppError('댓글을 찾을 수 없음', 404);

  res.json(updated);
});
