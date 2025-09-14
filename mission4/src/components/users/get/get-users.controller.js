import { AppError } from '../../../utils/app-error.js';
import { getUserService } from './get-users.service.js';

export const getUserController = async (req, res, next) => {
  try {
    if (!req.user) throw new AppError(401, 'UNAUTHORIZED', '로그인이 필요합니다.');

    const user = await getUserService(req.user.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
