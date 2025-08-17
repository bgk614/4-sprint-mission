// create-comment.controller.js
import { createCommentService } from './index.js';
import { asyncHandler } from '../../../utils/index.js';

export const createCommentController = asyncHandler(async (req, res) => {
  const created_comment = await createCommentService(req.validatedBody);
  res.status(201).json(created_comment);
});
