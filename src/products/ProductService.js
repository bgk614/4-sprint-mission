const { BASE_URL } = process.env;
const PRODUCT_URL = `${BASE_URL}/products`;

export const getProductList = async (params = {}) => {
  const url = new URL(PRODUCT_URL);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("[getProductList] Error:", err.message);
    throw err;
  }
};

export const getProduct = async (productId) => {
  const url = `${PRODUCT_URL}/${productId}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("[getProduct] Error", err.message);
    throw err;
  }
};

export const createProduct = async (productBody) => {
  const url = PRODUCT_URL;
  const { name, description, price, tags, images } = productBody;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("[createProduct] Error:", err.message);
    throw err;
  }
};

export const patchProduct = async (productId, productBody) => {
  const url = `${PRODUCT_URL}/${productId}`;

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productBody),
    });
    if (!res.ok) {
      throw new Error(`HTTP error status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("[patchProduct] Error:", err.message);
    throw err;
  }
};

export const deleteProduct = async (productId) => {
  const url = `${PRODUCT_URL}/${productId}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`HTTP error status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("[deleteProduct] Error:", err.message);
    throw err;
  }
};
