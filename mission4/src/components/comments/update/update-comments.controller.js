import { updateCommentService } from './update-comments.service.js';

export const updateCommentController = async (req, res, next) => {
  try {
    const { params, body } = res.locals.validated; // Zod에서 검증된 값
    const updatedComment = await updateCommentService({
      commentId: params.commentId,
      userId: req.user.id,
      content: body.content,
    });

    res.json(updatedComment);
  } catch (err) {
    next(err);
  }
};
