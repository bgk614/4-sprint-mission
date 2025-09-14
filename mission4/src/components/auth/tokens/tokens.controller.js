import { AppError } from '../../../utils/app-error.js';
import { refreshAccessTokenService } from './tokens.service.js';

export const refreshAccessTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body; // 또는 쿠키에서 가져올 수도 있음
    if (!refreshToken) throw new AppError(400, 'BAD_REQUEST', 'Refresh Token 필요');

    const newAccessToken = await refreshAccessTokenService(refreshToken);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    next(err);
  }
};
