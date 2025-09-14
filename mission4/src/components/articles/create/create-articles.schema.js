import { z } from 'zod';

/**
 * 게시글 생성 요청 검증 스키마
 *
 * - body.title: 문자열, 최소 1자, 최대 255자
 * - body.content: 문자열, 최소 1자, 최대 10000자
 */
export const createArticleSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(10000),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});
