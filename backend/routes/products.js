const router = require("express").Router();
let Product = require("../models/product.model");
const axios = require("axios");

router.post("/add", async (req, res) => {
  const newOriginProduct = new Product({
    userId: req.body.userId,
    originProduct: req.body.product,
    isExport: 0,
  });

  try {
    let result = await newOriginProduct.save();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "databaseFailed" });
  }
});

router.get("/list/:userId", async (req, res) => {
  let userId = req.params.userId;

  try {
    let result = await Product.find({ userId: userId, isExport: 0 });
    if (!(result && result.length)) {
      res.json({ error: "productNotFound" });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "databaseFailed" });
  }
});

router.get("/get/productIds/:userId", async (req, res) => {
  let userId = req.params.userId;

  try {
    let result = await Product.find({ userId: userId, isExport: 0 }, { _id: 0, "originProduct.id": 1 });
    if (!(result && result.length)) {
      res.json({ error: "productIdsNotFound" });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "databaseFailed" });
  }
});

router.get("/delete/:id", async (req, res) => {
  let delID = req.params.id;
  console.log(delID);
  let result = null;
  try {
    result = await Product.deleteOne({ _id: delID });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "databaseFailed" });
  }
});

router.post("/export/list/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    let result = await Product.find(
      { userId: userId, isExport: 1 },
      { _id: 0, "originProduct.standard_price": 1, "exportedProduct.product.id": 1 }
    );
    if (!(result && result.length)) {
      res.json({ error: "productNotFound" });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "databaseFailed" });
  }
});

module.exports = router;
