const { BASE_URL } = process.env;
const ARTICLE_URL = `${BASE_URL}/articles`;

export const getArticleList = (params) => {
  const url = new URL(ARTICLE_URL);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error status: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("getArticleList error:", err.message);
      throw err;
    });
};

export const getArticle = (articleId) => {
  const url = `${ARTICLE_URL}/${articleId}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error status: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("getArticle error:", err.message);
      throw err;
    });
};

export const createArticle = (articleBody) => {
  const url = ARTICLE_URL;
  const { title, content, image } = articleBody;

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, image }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error status: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("[createArticle] Fetch error:", err.message);
      throw err;
    });
};

export const patchArticle = (articleId, patchData) => {
  const url = `${ARTICLE_URL}/${articleId}`;
  return fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patchData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error status: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("[patchArticle] Fetch error:", err.message);
      throw err;
    });
};

export const deleteArticle = (articleId) => {
  const url = `${ARTICLE_URL}/${articleId}`;

  return fetch(url, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error status: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("[deleteArticle] Fetch error:", err.message);
      throw err;
    });
};
