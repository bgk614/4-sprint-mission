import { z } from 'zod';

/**
 * 상품 삭제 요청 검증 스키마
 *
 * - params.productId: 숫자 필수
 */
export const deleteArticleSchema = z.object({
  params: z.object({
    productId: z.string().regex(/^\d+$/, 'productId는 숫자여야 합니다.'),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});
