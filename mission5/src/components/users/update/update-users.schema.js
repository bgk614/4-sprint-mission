import { z } from 'zod';

export const updateUserSchema = z.object({
  body: z.object({
    nickname: z.string().min(1).max(255).optional(),
    email: z.email().optional(),
    image: z.string().optional(),
  }),
});
