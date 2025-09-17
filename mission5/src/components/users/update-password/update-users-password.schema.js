import { z } from 'zod';

/**
 * 비밀번호 변경 요청 검증 스키마
 *
 * - body.currentPassword: 현재 비밀번호, 필수
 * - body.newPassword: 새 비밀번호, 최소 8자
 */
export const updateUserPasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(8, '현재 비밀번호를 입력하세요.'),
    newPassword: z.string().min(8, '새 비밀번호는 최소 8자 이상이어야 합니다.'),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});
