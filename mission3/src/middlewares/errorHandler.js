// middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational === true;

  const payload = {
    status:
      err.status || (String(statusCode).startsWith('4') ? 'fail' : 'error'),
    message: isOperational ? err.message : '서버 에러'
  };

  // 검증 오류 세부사항이 있으면(선택) 같이 내려주기
  if (statusCode === 400 && err.details) payload.details = err.details;
  console.error(err); // 🔥 에러 스택 찍어보기
  res.status(statusCode).json(payload);
};
