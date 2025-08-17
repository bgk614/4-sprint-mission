import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.userComment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();

  const productsData = [
    {
      name: '캐논 ixy70',
      description: '작동 확인 완료, 액정 코팅 벗겨짐',
      price: 200000,
      tags: ['카메라', '디카', '캐논'],
      userComments: [
        { content: '뷰파인더 사진 부탁드려도 될까요' },
        { content: '아직 판매 중이신가요' }
      ]
    },
    {
      name: '후지필름 x100v',
      description: '컷수 1000장 미만',
      price: 2000000,
      tags: ['후지필름', '카메라'],
      userComments: [{ content: '보증 기간 안 지났나요' }]
    }
  ];

  const articlesData = [
    {
      title: '제습함 교체시기',
      content: '다이소 제습함 쓰시는 분들 실리카겔 교체 시기가 어떻게 되실까요',
      userComments: [{ content: '알갱이가 검은색으로 바뀌면 교체해줍니다' }]
    },
    {
      title: 'X-T5 흑백사진',
      content: '오늘 산책을 하면서 사진을 찍어봤습니다',
      userComments: [
        { content: '사진 느낌 좋네요' },
        { content: '카메라 설정 공유해주실 수 있나요' }
      ]
    }
  ];

  await prisma.$transaction(async (tx) => {
    for (const p of productsData) {
      await tx.product.create({
        data: {
          name: p.name,
          description: p.description,
          price: p.price,
          tags: p.tags,
          userComments: {
            create: p.userComments
          }
        }
      });
    }

    for (const a of articlesData) {
      await tx.article.create({
        data: {
          title: a.title,
          content: a.content,
          userComments: {
            create: a.userComments
          }
        }
      });
    }
  });
}

main()
  .then(async () => {
    console.log('시딩 성공');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
