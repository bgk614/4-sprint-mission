import { refreshTokenService } from './tokens.service.js';

export const refreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body; // 또는 쿠키에서 가져올 수도 있음
    // TODO: 쿠키에서 토큰 가져올 수 있도록 추가
    const newToken = await refreshTokenService(refreshToken);

    res.status(200).json({ accessToken: newToken });
  } catch (err) {
    next(err);
  }
};
// TODO: 리프레시 토큰 폐기 로직 추가(로그아웃)
// TODO: 쿠키 보안 추가 (sameSite, secure)