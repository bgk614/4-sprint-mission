import { asyncHandler } from '../../../utils/asyncHandler.js';
import { listCommentsService } from './list-comments.service.js';

export const listProductCommentsController = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { cursor, limit } = req.validatedQuery;

  const comments = await listCommentsService({
    targetType: 'product',
    targetId: Number(productId),
    cursor,
    limit
  });

  res.json(comments);
});
