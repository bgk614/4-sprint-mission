import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '../../../../config/constants.js';
import { createSessionService } from './create-sessions.service.js';

export async function createSessionController(req, res, next) {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await createSessionService(email, password);
    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
    });
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
    });
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    next(err);
  }
}
