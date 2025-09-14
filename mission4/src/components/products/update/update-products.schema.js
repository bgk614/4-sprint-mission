import { z } from 'zod';

/**
 * 상품 수정 요청 검증 스키마
 *
 * - params.productId: 수정할 상품 ID, 숫자 필수
 * - body.name: 문자열, 선택적
 * - body.description: 문자열, 선택적
 * - body.price: 양의 정수, 선택적
 * - body.tags: 문자열 배열, 선택적
 */
export const updateProductSchema = z.object({
  params: z.object({
    productId: z.string().regex(/^\d+$/, 'productId는 숫자여야 합니다.'),
  }),
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().min(1).max(10000).optional(),
    price: z.number().int().positive().optional(),
    tags: z.array(z.string()).optional(),
  }),
  query: z.object({}).optional(),
});
