const { readFile, writeFile } = require("../lib/fs");

const getAllProducts = async () => {
  const products = await readFile("./src/data/products.json", "utf-8");
  return products;
};

const getProductById = async (id = 0) => {
  const products = (await readFile("./src/data/products.json", "utf-8")) || [];
  const product = products.find((item) => item.id === id);
  return product;
};

const postProduct = async (data) => {
  const products = (await readFile("./src/data/products.json", "utf-8")) || [];
  const newProduct = [...products, data];
  await writeFile(
    "./src/data/products.json",
    JSON.stringify(newProduct),
    "utf-8"
  );
  return data;
};

const putProductById = async (id = 0, { name, price, image }) => {
  const products = await getAllProducts();
  const product = await getProductById(Number(id));

  if (!product) {
    throw new Error("Product not found!");
  }

  if (!name || !price || !image) {
    throw new Error("Some field are missing!");
  }

  const index = products.indexOf(product);
  products[index] = { name, price, image };

  console.log(products[index]);

  await writeFile(
    "./src/data/products.json",
    JSON.stringify(products),
    "utf-8"
  );

  return products[index];
};

const patchProductById = async (id = 0, { name, price, image }) => {
  const products = await getAllProducts();
  const product = await getProductById(Number(id));

  if (!product) {
    throw new Error("Product not found!");
  }

  const index = products.indexOf(product);
  products[index] = { name, price, image };

  console.log(products[index]);

  await writeFile(
    "./src/data/products.json",
    JSON.stringify(products),
    "utf-8"
  );

  return products[index];
};

const deleteProductById = async (id = 0) => {
  const products = await getAllProducts();
  const product = await getProductById(Number(id));

  if (!product) {
    throw new Error("Product not found!");
  }

  delete products[product];
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProductById,
  patchProductById,
  deleteProductById,
};
