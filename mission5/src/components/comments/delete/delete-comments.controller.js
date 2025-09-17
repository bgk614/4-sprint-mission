import { deleteCommentService } from './delete-comments.service.js';

/**
 * 댓글 삭제 컨트롤러
 *
 * 인증된 사용자의 요청을 받아 댓글 삭제
 *
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @param {NextFunction} next - Express 에러 핸들링을 위한 next 함수
 * @returns {Promise<void>} - 성공 시 204 No Content 응답
 *
 * @throws {AppError} - 인증 실패 시 401 Unauthorized
 * @throws {ValidationError} - 요청 데이터 검증 실패 시
 * @throws {AppError} - 권한 없음 403 Forbidden
 */

export const deleteCommentController = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { params } = res.locals['validated'];

    await deleteCommentService({
      commentId: Number(params.commentId),
      userId: req.user.id,
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
