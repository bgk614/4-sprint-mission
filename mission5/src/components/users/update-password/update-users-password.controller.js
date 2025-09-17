import { updateUserPasswordService } from './update-users-password.service.js';

export const updateUserPasswordController = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = res.locals.validated.body;
    const updatedUser = await updateUserPasswordService(req.user.id, currentPassword, newPassword);
    res.status(200).json({ message: '비밀번호가 변경되었습니다.', user: updatedUser });
  } catch (err) {
    next(err);
  }
};
