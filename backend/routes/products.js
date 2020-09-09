const router = require("express").Router();
let Product = require("../models/product.model");

router.post("/add", async (req, res) => {
  const newOriginProduct = new Product({
    userId: req.body.userId,
    originProduct: req.body.product,
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
    let result = await Product.find({ userId: userId });
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
    let result = await Product.find({ userId: userId }, { _id: 0, "originProduct.id": 1 });
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
router.post("/update/:id", async (req, res) => {
  let productId = req.params.id;
  let dataToSave = req.body;
  let result = null;
  try {
    result = await Product.findByIdAndUpdate(productId, { product: dataToSave.product }, { new: true });
    res.json(result);
  } catch (error) {
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

module.exports = router;
