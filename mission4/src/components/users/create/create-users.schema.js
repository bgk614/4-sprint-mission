import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    nickname: z.string().min(1).max(255),
    email: z.email(),
    image: z.url().optional(),
    password: z.string().min(8).max(255),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});
