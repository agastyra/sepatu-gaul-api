const express = require("express");
const {
  getAllProducts,
  getProductById,
  postProduct,
  putProductById,
  patchProductById,
  deleteProductById,
} = require("../service/product.service");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();

    if (!products) {
      res.status(404).json({
        message: "Product not found!",
      });
      return false;
    }

    res.status(200).json({
      message: "Product found!",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong! ${error.message}`,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductById(Number(id));

    if (product.length < 1) {
      res.status(404).json({
        message: "Product not found!",
      });
      return false;
    }

    res.status(200).json({
      message: "Product found!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong! ${error.message}`,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const product = await postProduct(data);

    res.status(201).json({
      message: "Product created!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong! ${error.message}`,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = await putProductById(Number(id), data);

    res.status(200).json({
      message: "Product updated!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong! ${error.message}`,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = await patchProductById(Number(id), data);

    res.status(200).json({
      message: "Product updated!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong! ${error.message}`,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProductById(Number(id));

    res.status(200).json({
      message: "Product deleted!",
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong! ${error.message}`,
    });
  }
});

module.exports = router;
