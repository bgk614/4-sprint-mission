import { z } from 'zod';

export const getProductSchema = z.object({
  productId: z.coerce.number().int().positive({
    message: 'id는 1 이상의 정수여야 합니다.'
  })
});
