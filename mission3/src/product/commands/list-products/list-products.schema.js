import { z } from 'zod';

export const listProductsSchema = z.object({
  offset: z
    .string()
    .optional()
    .default('0')
    .transform((v) => Number(v))
    .refine((n) => !isNaN(n) && Number.isInteger(n) && n >= 0, {
      message: 'offset은 0 이상의 정수',
    }),
  limit: z
    .string()
    .optional()
    .default('10')
    .transform((v) => Number(v))
    .refine((n) => Number.isInteger(n) && n > 0 && n <= 100, {
      message: 'limit은 1~100 정수',
    }),

  // 빈 문자열을 undefined로 바꾼 뒤 enum 검사 → 기본값 recent 적용
  sort: z.preprocess(
    (v) => (v === '' || v == null ? undefined : v),
    z.enum(['recent']).optional().default('recent')
  ),

  // 공백만 들어오면 빈 문자열로, 검색 편의
  search: z.preprocess(
    (v) => (typeof v === 'string' ? v.trim() : v),
    z.string().optional().default('')
  ),
});
