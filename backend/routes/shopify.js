const router = require("express").Router();
const nonce = require("nonce")();
const crypto = require("crypto");
const querystring = require("querystring");
const axios = require("axios");
let Shopify = require("../models/shopify.model");
let Product = require("../models/product.model");

const appId = process.env.SHOPIFY_API_KEY;
const appSecret = process.env.SHOPIFY_SECRET_KEY;
const appScope = process.env.SHOPIFY_APP_SCOPE;

router.get("/install/:shop", (req, res) => {
  const shop = req.params.shop;
  const appDomain = "http://localhost:3000";
  if (shop) {
    const state = nonce();
    // const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${appId}&scope=${appScope}&redirect_uri=${appDomain}&state=${state}&grant_options[]=per-user`;
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${appId}&scope=${appScope}&redirect_uri=${appDomain}&state=${state}`;
    res.cookie("State", state);
    res.redirect(installUrl);
  } else {
    res.status(400).json("Missing shop parameter!");
  }
});

router.get("/auth", async (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = req.cookies.State;
  // if (state !== stateCookie) {
  //     return res.status(403).json("Request origin cannot be verified.");
  // }
  if (shop && hmac && code) {
    const map = Object.assign({}, req.query);
    delete map["hmac"];
    const message = querystring.stringify(map);
    const generateHash = crypto.createHmac("sha256", appSecret).update(message).digest("hex");
    if (generateHash !== hmac) {
      res.status(400).json("HMAC Validation failed");
    } else {
      const accessTokenRequestUrl = "https://" + shop + "/admin/oauth/access_token";
      let accessTokenPayload = {
        client_id: appId,
        client_secret: appSecret,
        code,
      };

      try {
        let response = await axios.post(accessTokenRequestUrl, accessTokenPayload);

        const newShopifyTokenInfo = new Shopify({
          authTokenInfo: response.data,
        });
        await newShopifyTokenInfo
          .save()
          .then((response) => {
            res.json(response);
          })
          .catch((error) => {
            res.json(error);
          });
      } catch (error) {
        res.json("failed");
      }
    }
  } else {
    res.status(400).json("Required parameters missing");
  }
});

router.post("/export/product", async (req, res) => {
  const shop = req.body.shop;
  const product = req.body.product;
  const token = req.body.token;

  try {
    let response = await axios.post(`https://${shop}/admin/api/2020-07/products.json`, product, {
      headers: {
        "X-Shopify-Access-Token": token,
        "content-type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "shopifyError" });
  }
});

router.post("/export/variant", async (req, res) => {
  const shop = req.body.shop;
  const variant = req.body.variant;
  const vId = parseInt(req.body.vId);
  const token = req.body.token;
  const inventoryItemId = req.body.inventoryItemId;
  const locationId = req.body.locationId;
  const quantity = req.body.quantity;
  try {
    let response = await axios.put(`https://${shop}/admin/api/2020-07/variants/${vId}.json`, variant, {
      headers: {
        "X-Shopify-Access-Token": token,
        "content-type": "application/json",
      },
    });
    await axios.post(
      `https://${shop}/admin/api/2020-07/inventory_levels/set.json`,
      { location_id: locationId, inventory_item_id: inventoryItemId, available: quantity },
      {
        headers: {
          "X-Shopify-Access-Token": token,
          "content-type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "shopifyError" });
  }
});

router.post("/locations", async (req, res) => {
  const shop = req.body.shop;
  const token = req.body.token;
  try {
    let response = await axios.get(`https://${shop}/admin/api/2020-07/locations.json`, {
      headers: {
        "X-Shopify-Access-Token": token,
        "content-type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "shopifyError" });
  }
});

router.post("/product/update", async (req, res) => {
  let dataToSave = req.body;
  let result = null;
  try {
    result = await Product.findByIdAndUpdate(
      dataToSave.productId,
      { isExport: 1, exportedProduct: dataToSave.product },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "databaseFailed" });
  }
});

router.post("/get/products", async (req, res) => {
  const shop = req.body.shop;
  const token = req.body.token;
  const productIds = req.body.productIds;
  try {
    let apiUrl = `https://${shop}/admin/api/2020-07/products.json?ids=${parseInt(productIds)}`;
    let response = await axios.get(apiUrl, {
      headers: {
        "X-Shopify-Access-Token": token,
        "content-type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "databaseFailed" });
  }
});

module.exports = router;
