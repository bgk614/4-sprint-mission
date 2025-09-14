import { createArticleService } from './create-articles.service.js';

/**
 * 게시글 생성 컨트롤러
 *
 * 인증된 사용자의 요청을 받아 게시글 생성
 *
 * @param {Request} req - Express 요청 객체
 * @param {Response} res - Express 응답 객체
 * @param {NextFunction} next - Express 에러 핸들링을 위한 next 함수
 * @returns {Promise<void>} - 생성된 게시글을 JSON으로 응답
 *
 * @throws {AppError} - 인증 실패 시 401 Unauthorized
 * @throws {ValidationError} - 요청 데이터 검증 실패 시
 * @example
 * // 요청 예시
 * POST /articles
 * {
 *  "title": "첫 번째 글",
 *  "content": "내용",
 * }
 * // 응답 예시
 * {
 *  "id": 1,
 *  "title": "첫 번째 글",
 *  "content": "내용",
 *  "authorId": 123
 * }
 */

export const createArticleController = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { body } = res.locals['validated'];

    const article = await createArticleService({
      title: body.title,
      content: body.content,
      authorId: req.user.id,
    });

    res.status(201).json(article);
    return;
  } catch (err) {
    next(err);
  }
};
