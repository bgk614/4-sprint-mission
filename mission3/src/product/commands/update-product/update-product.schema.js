import { z } from 'zod';

export const updateProductSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    price: z.number().min(0).optional(),
    tags: z.array(z.string().trim().min(1)).optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: '업데이트할 필드가 최소 1개 필요합니다.',
  });
