import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(10000),
    price: z.number().int().positive(),
    tags: z.array(z.string()).optional().default([]),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});
