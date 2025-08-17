import { z } from 'zod';

export const deleteProductSchema = z.object({
  productId: z
    .string()
    .regex(/^\d+$/, { message: 'ID는 숫자여야 합니다.' })
    .transform(Number)
    .refine((productId) => productId > 0, { message: 'ID는 1 이상의 숫자여야 합니다.' }),
});
