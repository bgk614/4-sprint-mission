import bcrypt from 'bcrypt';

import prisma from '../../../../config/prisma.js';
import { generateTokens } from '../../../../config/token.js';

export async function createSessionService(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const { accessToken, refreshToken } = generateTokens(user.id);
  return { user, accessToken, refreshToken };
}
