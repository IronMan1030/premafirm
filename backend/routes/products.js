const router = require("express").Router();
let Product = require("../models/product.model");

router.post("/add", async (req, res) => {
    const newProduct = new Product({
        product: { productId: req.body.productId },
    });

    try {
        // let result = await Product.find({
        //     "product.productId": req.body.productId,
        // });
        // if (result && result.length) {
        //     res.json({ error: "productExist" });
        //     return;
        // }
        let result = await newProduct.save();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "databaseFailed" });
    }
});
router.get("/list", async (req, res) => {
    try {
        let result = await Product.find();
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
        result = await Product.findByIdAndUpdate(
            productId,
            { product: dataToSave.product },
            { new: true }
        );
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: "databaseFailed" });
    }
});

// router.get("/delete/:id", (req, res) => {
//     let delID = req.params.id;
//     Vehicle.deleteOne({ _id: delID })
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             res.send(err);
//         });
// });

module.exports = router;
