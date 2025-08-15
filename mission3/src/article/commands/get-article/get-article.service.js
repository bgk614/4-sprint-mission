export const getArticleService = async (id) => {
  return articles.find((article) => article.id === id);
};
