export const createCommentService = async (commentData) => {
  return await prisma.comment.create({
    data: {
      content: commentData.content
    },
    select: {
      id: true,
      content: true
    }
  });
};
