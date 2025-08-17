import { asyncHandler } from '../../../shared/asyncHandler.js';
import { listCommentsService } from './list-comments.service.js';

export const listArticleCommentsController = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { cursor, limit } = req.validatedQuery;

  const comments = await listCommentsService({
    targetType: 'article',
    targetId: Number(articleId),
    cursor,
    limit
  });

  res.json(comments);
});
