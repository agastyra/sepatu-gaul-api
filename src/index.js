const express = require("express");
const dotenv = require("dotenv");
const productController = require("./controller/product.controller");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173/");
  res.setHeader("Access-Control-Allow-Method", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
