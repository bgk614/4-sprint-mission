import { AppError } from './app-error.js';
/**
 * 전역 에러 핸들러에서 포맷된 응답 리턴
 * 입력값 검증 과정에서 발생하는 에러 정의
 */

export class ValidationError extends AppError {
  constructor(message, details = {}) {
    super(400, 'VALIDATION_ERROR', message);
    this.details = details;
  }
}
