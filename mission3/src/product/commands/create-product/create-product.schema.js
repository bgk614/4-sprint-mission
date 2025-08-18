import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: '상품 이름은 비워둘 수 없습니다.' }),
  description: z
    .string()
    .trim()
    .min(1, { message: '상품 설명은 비워둘 수 없습니다.' }),
  price: z.number().min(0, { message: '상품 가격은 0 이상이어야 합니다.' }),
  tags: z.array(
    z.string().trim().min(1, { message: '태그는 비워둘 수 없습니다.' })
  )
});
