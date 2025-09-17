import { createProductService } from './create-products.service.js';

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
 * POST /products
 * {
 *  "name": "상품 이름",
 *  "description": "상품 설명",
 *  "price": "10000",
 *  "tags": ["태그1", "태그2"]
 * }
 * // 응답 예시
 * {
 *  "id": 1,
 *  "name": "상품 이름",
 *  "description": "상품 설명",
 *  "price": "10000",
 *  "tags": ["태그1", "태그2"]
 *  "authorId": 123
 * }
 */

export const createProductController = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { body } = res.locals['validated'];

    const product = await createProductService({
      name: body.name,
      description: body.description,
      price: body.price,
      tags: body.tags,
      authorId: req.user.id,
    });

    res.status(201).json(product);
    return;
  } catch (err) {
    next(err);
  }
};
