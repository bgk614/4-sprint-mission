/**
 * 커스텀 에러 클래스 (전역 베이스)
 */
export class AppError extends Error {
  constructor({ status = 500, code, message, path, details }) {
    super(message);
    this.status = Number(status); // HTTP 상태 (예: 400, 401, 500)
    this.code = code; // 서비스 고유 에러 코드 (예: 401001)
    this.message = message; // 사용자에게 보여줄 메시지
    this.path = path; // 요청 URL
    this.details = details; // 내부 로깅용 추가 데이터
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
