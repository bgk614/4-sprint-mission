import bcrypt from 'bcryptjs';

import prisma from '../../../config/prisma.js';

export async function createUserService(email, nickname, password) {
  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 유저 생성
  const user = await prisma.user.create({
    data: {
      email,
      nickname,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      nickname: true,
      createdAt: true,
    },
  });

  return user;
}

import bcrypt from 'bcrypt';

import prisma from '../../../config/prisma.js';

export async function createUserService(email, nickname, password, image) {
  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 유저 생성
  const user = await prisma.user.create({
    data: {
      email,
      nickname,
      password: hashedPassword,
      image,
    },
    select: {
      id: true,
      email: true,
      nickname: true,
      createdAt: true,
      image: true,
    },
  });

  return user;
}
