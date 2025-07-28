import {
  getProductList,
  Product,
  ElectronicProduct,
} from "./index.js";

export const makeProductArray = async (page, pageSize) => {
  console.log("=== 작업 1 : 상품 리스트 각각 products 배열에 저장 ===");

  const res = await getProductList({ page, pageSize });
  const products = [];

  res.list.forEach((item) => {
    let instance;
    const tags = Array.isArray(item.tags) ? item.tags : [];
    if (tags.includes("전자제품")) {
      instance = new ElectronicProduct(
        item.name,
        item.description,
        item.price,
        item.tags,
        item.images,
        item.manufacturer
      );
    } else {
      instance = new Product(
        item.name,
        item.description,
        item.price,
        item.tags,
        item.images
      );
    }
    products.push(instance);
  });

  console.log(products);
};
