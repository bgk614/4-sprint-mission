import { z } from 'zod';

/**
 * 댓글 삭제 요청 검증 스키마
 *
 * - params.id: 숫자 필수
 */
export const deleteCommentSchema = z.object({
  params: z.object({
    commentId: z.coerce.number().int().positive(), // 문자열이라도 숫자로 변환, 정수, 양수 검증
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});
