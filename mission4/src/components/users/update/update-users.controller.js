import { updateUserService } from './update-users.service.js';

export const updateUserController = async (req, res, next) => {
  try {
    const data = res.locals.validated.body;
    const updatedUser = await updateUserService(req.user.id, data);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
