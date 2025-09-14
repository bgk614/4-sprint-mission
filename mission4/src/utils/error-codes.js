// utils/error-codes.js
export const ErrorCodes = {
  // 인증 관련
  EMAIL_IN_USE: { status: 400, code: 400001, message: '이미 사용 중인 이메일' },
  NICKNAME_IN_USE: { status: 400, code: 400002, message: '이미 사용 중인 닉네임' },
  INVALID_PASSWORD: { status: 400, code: 400003, message: '비밀번호 유효성 실패' },

  UNAUTHORIZED: { status: 401, code: 401001, message: '인증 실패' },
  TOKEN_MISSING: { status: 401, code: 401002, message: '토큰 없음' },
  TOKEN_INVALID: { status: 401, code: 401003, message: '잘못된 토큰' },
  TOKEN_EXPIRED: { status: 401, code: 401004, message: '만료된 토큰' },
  REFRESH_TOKEN_INVALID: { status: 403, code: 403001, message: 'Refresh Token 무효' },

  // 인가 관련
  FORBIDDEN: { status: 403, code: 403101, message: '권한 없음' },

  // 상품
  PRODUCT_NOT_FOUND: { status: 404, code: 404101, message: '상품 없음' },

  // 게시글
  POST_NOT_FOUND: { status: 404, code: 404201, message: '게시글 없음' },

  // 댓글
  COMMENT_NOT_FOUND: { status: 404, code: 404301, message: '댓글 없음' },

  // 유저
  USER_NOT_FOUND: { status: 404, code: 404401, message: '유저 없음' },
  PASSWORD_INVALID: { status: 400, code: 400401, message: '유효하지 않은 비밀번호' },

  // 좋아요
  LIKE_TARGET_NOT_FOUND: { status: 404, code: 404501, message: '좋아요 대상 없음' },

  // 서버/DB
  INTERNAL: { status: 500, code: 500000, message: '내부 서버 오류' },
  DB_ERROR: { status: 500, code: 500001, message: 'DB 에러' },
  EXTERNAL_SERVICE_ERROR: { status: 503, code: 503001, message: '외부 서비스 장애' },
};
