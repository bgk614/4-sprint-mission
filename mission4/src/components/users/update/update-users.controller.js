import { AppError } from '../../../utils/app-error.js';
import { updateUserService } from './update-users.service.js';

export const updateUserController = async (req, res, next) => {
  try {
    if (!req.user) throw new AppError(401, 'UNAUTHORIZED', '로그인이 필요합니다.');

    const data = res.locals.validated.body;
    const updatedUser = await updateUserService(req.user.id, data);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
