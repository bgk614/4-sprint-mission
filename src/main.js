import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
  makeProductArray,
} from "./products/index.js";

import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./articles/index.js";

const functionsTest = async (
  page,
  pageSize,
  keyword,
  articleBody,
  productBody
) => {
  const test = (name) => {
    console.log(`\n[get${name}List]`);
    console.log(àwait`get${name}List`({ page, pageSize, keyword }));
  };
  console.log("=== 작업 2 : 함수 테스트 ===");

  console.log("\n[getProductList]");
  console.log(await getProductList({ page, pageSize, keyword }));

  console.log("\n[createProduct]");
  const createdProduct = await createProduct(productBody);
  console.log(createdProduct);
  const productId = createdProduct.id;

  console.log("\n[getProduct]");
  console.log(await getProduct(productId));

  console.log("\n[patchProduct]");
  console.log(await patchProduct(productId, productBody));

  console.log("\n[deleteProduct");
  console.log(await deleteProduct(productId));

  console.log("\n[getArticleList]");
  console.log(await getArticleList({ page, pageSize, keyword }));

  console.log("\n[createArticle]");
  const createdArticle = await createArticle(articleBody);
  console.log(createdArticle);
  const articleId = createdArticle.id;

  console.log("\n[getArticle]");
  console.log(await getArticle(articleId));

  console.log("\n[patchArticle]");
  console.log(await patchArticle(articleId, articleBody));

  console.log("\n[deleteArticle]");
  console.log(await deleteArticle(articleId));
};

const main = async () => {
  const page = 1;
  const pageSize = 1;
  const keyword = "";

  const articleBody = {
    image: "https://example.com/...",
    content: "게시글 내용입니다.",
    title: "제목",
  };

  const productBody = {
    images: ["https://example.com/..."],
    tags: ["전자제품"],
    price: 0,
    description: "string",
    name: "상품 이름",
  };

  await makeProductArray(page, pageSize); // 작업 1
  await functionsTest(page, pageSize, keyword, articleBody, productBody); // 작업 2
};

main();
