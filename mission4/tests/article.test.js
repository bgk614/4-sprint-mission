// 게시글 등록
// 비로그인 게시글 등록
// 게시글 수정
// 비로그인 게시글 수정
// 게시글 삭제
// 비로그인 게시글 삭제
// 게시글 조회
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

import app from '../src/app.js'; // Express app 가져오기

describe('Article API', () => {
  let cookie;

  beforeAll(async () => {
    // 로그인
    const res = await request(app).post('/sessions').send({
      email: 'test@test.com',
      password: '0000',
    });

    cookie = res.headers['set-cookie'][0];
  });

  it('로그인 없이 글 생성 → 401', async () => {
    const res = await request(app).post('/articles').send({ title: 'Unauthorized', content: '내용' });

    expect(res.status).toBe(401);
  });

  it('로그인 후 글 생성 → 201', async () => {
    const res = await request(app)
      .post('/articles')
      .set('Cookie', cookie)
      .send({ title: '테스트 글', content: '내용' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('테스트 글');
    expect(res.body.content).toBe('내용');
    expect(res.body.authorId).toBeDefined();
  });
});
