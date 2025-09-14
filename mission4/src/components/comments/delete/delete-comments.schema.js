import { z } from 'zod';

/**
 * 댓글 삭제 요청 검증 스키마
 *
 * - params.id: 숫자 필수
 */
export const deleteCommentSchema = z.object({
  params: z.object({
    commentId: z.string().regex(/^\d+$/, 'commentId는 숫자여야 합니다.'),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});
