// prisma/seed.ts
import prisma from '../../../prisma.js';

async function main() {
  // 0) 깨끗이 시작 (FK 순서 주의)
  await prisma.comment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();

  // 1) 기본 데이터
  const productsData = [
    {
      name: '캐논 ixy70',
      description: '작동 확인 완료, 액정 코팅 벗겨짐',
      price: 200000,
      tags: ['카메라', '디카', '캐논'],
      comments: [{ content: '뷰파인더 사진 부탁드려도 될까요' }, { content: '아직 판매 중이신가요' }]
    },
    {
      name: '후지필름 x100v',
      description: '컷수 1000장 미만',
      price: 2000000,
      tags: ['후지필름', '카메라'],
      comments: [{ content: '보증 기간 안 지났나요' }]
    }
  ];

  const articlesData = [
    {
      title: '제습함 교체시기',
      content: '다이소 제습함 쓰시는 분들 실리카겔 교체 시기가 어떻게 되실까요',
      comments: [{ content: '알갱이가 검은색으로 바뀌면 교체해줍니다' }]
    },
    {
      title: 'X-T5 흑백사진',
      content: '오늘 산책을 하면서 사진을 찍어봤습니다',
      comments: [{ content: '사진 느낌 좋네요' }, { content: '카메라 설정 공유해주실 수 있나요' }]
    }
  ];

  // 2) 트랜잭션으로 시딩 (create + nested write)
  await prisma.$transaction(async (tx) => {
    // Product + Comment (nested create)
    for (const p of productsData) {
      await tx.product.create({
        data: {
          name: p.name,
          description: p.description,
          price: p.price,
          tags: p.tags,
          comments: {
            create: p.comments // nested writes
          }
        }
      });
    }

    // Article + Comment (nested create)
    for (const a of articlesData) {
      await tx.article.create({
        data: {
          title: a.title,
          content: a.content,
          comments: {
            create: a.comments
          }
        }
      });
    }

    // 3) 양방향 관계 예시: 기존 Product/Article에 댓글 추가 (connect)
    const firstProduct = await tx.product.findFirst({ select: { id: true } });
    const firstArticle = await tx.article.findFirst({ select: { id: true } });

    if (firstProduct?.id) {
      await tx.comment.create({
        data: {
          content: '첫 상품 추가 코멘트',
          product: { connect: { id: firstProduct.id } }
        }
      });
    }
    if (firstArticle?.id) {
      await tx.comment.create({
        data: {
          content: '첫 게시글 추가 코멘트',
          article: { connect: { id: firstArticle.id } }
        }
      });
    }
  });
}

main()
  .then(async () => {
    console.log('🌱 Seeding complete');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
