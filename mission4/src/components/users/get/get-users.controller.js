import { getUserService } from './get-users.service.js';

export const getUserController = async (req, res, next) => {
  try {
    const user = await getUserService(req.user.id);
    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    next(err);
  }
};
