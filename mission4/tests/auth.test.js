import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

import app from '../src/app.js';

describe('인증/인가 API', () => {
  let cookie;

  beforeAll(async () => {
    // 최초 유저 생성
    await request(app).post('/users').send({
      email: 'test2@test.com',
      nickname: 'tester',
      password: '0000',
    });

    // 로그인해서 쿠키 확보
    const res = await request(app).post('/sessions').send({
      email: 'test2@test.com',
      password: '0000',
    });
    cookie = res.headers['set-cookie'][0];
  });
  // 로그아웃
  // 로그인 실패
  // 존재하지 않는 이메일
  // 비밀번호 불일치

  it('중복 이메일 회원가입 → 400', async () => {
    const res = await request(app).post('/users').send({
      email: 'test2@test.com',
      nickname: 'tester2',
      password: '0000',
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('이미 사용 중인 이메일');
  });

  it('중복 닉네임 회원가입 → 400', async () => {
    const res = await request(app).post('/users').send({
      email: 'test3@test.com',
      nickname: 'tester',
      password: '0000',
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('이미 사용 중인 닉네임');
  });

  it('쿠키로 인증된 요청 성공 → 201', async () => {
    const res = await request(app).post('/articles').set('Cookie', cookie).send({ title: '제목', content: '내용' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', '제목');
  });
});
