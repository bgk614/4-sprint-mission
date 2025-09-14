import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    nickname: z.string().min(1).max(255),
    email: z.string().email(),
    image: z.string().url().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});
