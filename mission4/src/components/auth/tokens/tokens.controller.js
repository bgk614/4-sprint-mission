import { refreshTokenService } from './tokens.service.js';

export const refreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body; // 또는 쿠키에서 가져올 수도 있음
    const newToken = await refreshTokenService(refreshToken);

    res.status(200).json({ accessToken: newToken });
  } catch (err) {
    next(err);
  }
};
