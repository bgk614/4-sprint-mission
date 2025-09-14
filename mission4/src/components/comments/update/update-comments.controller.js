import prisma from '../../../config/prisma.js';
import { AppError } from '../../../utils/app-error.js';

export const updateCommentController = async (req, res, next) => {
  try {
    if (!req.user) throw new AppError(401, 'UNAUTHORIZED', '로그인이 필요합니다.');

    const { id } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.findUnique({ where: { id: Number(id) } });
    if (!comment) throw new AppError(404, 'NOT_FOUND', '댓글을 찾을 수 없습니다.');
    if (comment.authorId !== req.user.id) throw new AppError(403, 'FORBIDDEN', '본인 댓글만 수정할 수 있습니다.');

    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content },
    });

    res.json(updatedComment);
  } catch (err) {
    next(err);
  }
};
