import { deleteProductService } from './index.js';
import { AppError } from '../../../utils/index.js';
import { asyncHandler } from '../../../utils/index.js';

export const deleteProductController = asyncHandler(async (req, res) => {
  const { productId } = req.validatedParams;
  const product = await deleteProductService(productId);
  if (!product) throw new AppError('상품을 찾을 수 없음', 404);
  res.status(200).json({ message: '상품 삭제 성공' });
});
