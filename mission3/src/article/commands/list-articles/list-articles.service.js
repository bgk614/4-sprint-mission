export function listArticlesService({ offset = 0, limit = 10, sort, search }) {
  let filtered = articles;
  // 검색 기능
  if (search) {
    const keyword = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(keyword) ||
        p.content.toLowerCase().includes(keyword)
    );
  }

  // 정렬 처리 (recent일 경우 최신순)
  if (sort === 'recent') {
    filtered = filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  // offset, limit 적용 (페이지네이션)
  return filtered
    .slice(offset, offset + limit)
    .map(({ id, title, content, createdAt }) => ({
      id,
      title,
      content,
      createdAt,
    }));
}
