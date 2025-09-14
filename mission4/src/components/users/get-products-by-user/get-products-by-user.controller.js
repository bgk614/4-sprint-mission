import { AppError } from '../../../utils/app-error.js';
import { getProductsByUserService } from './get-products-by-user.service.js';

export const getProductsByUserController = async (req, res, next) => {
  try {
    if (!req.user) throw new AppError(401, 'UNAUTHORIZED', '로그인이 필요합니다.');

    const products = await getProductsByUserService(req.user.id);

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};
