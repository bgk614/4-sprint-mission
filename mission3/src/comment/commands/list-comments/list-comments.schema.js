import { z } from 'zod';

export const listCommentsSchema = z.object({
  cursor: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined)),

  limit: z
    .string()
    .optional()
    .default('10')
    .transform((v) => Number(v))
    .refine((n) => Number.isInteger(n) && n > 0 && n <= 100, {
      message: 'limit은 1~100 정수'
    }),

  sort: z.preprocess(
    (v) => (v === '' || v == null ? undefined : v),
    z.enum(['recent', 'old']).optional().default('recent')
  )
});
