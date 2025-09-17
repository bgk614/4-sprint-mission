import { updateArticleService } from './update-articles.service.js';

/**
 * 게시글 수정 컨트롤러
 *
 * 인증된 사용자의 요청을 받아 게시글 수정
 *
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @param {NextFunction} next - Express 에러 핸들링을 위한 next 함수
 * @returns {Promise<void>} - 수정된 게시글을 JSON으로 응답
 *
 * @throws {AppError} - 인증 실패 시 401 Unauthorized
 * @throws {ValidationError} - 요청 데이터 검증 실패 시
 * @throws {AppError} - 게시글 없음(404), 권한 없음(403)
 */
export const updateArticleController = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { params, body } = res.locals['validated'];

    const updated = await updateArticleService({
      articleId: Number(params.articleId),
      userId: req.user.id,
      title: body.title,
      content: body.content,
    });

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
