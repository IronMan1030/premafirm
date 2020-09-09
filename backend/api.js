const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
require("dotenv").config();
require("./db");
const cookieParser = require("cookie-parser");

const productRouter = require("./routes/products");
const userRouter = require("./routes/user");
const shopifyRouter = require("./routes/shopify");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/.netlify/functions/api/v1/product", productRouter);
app.use("/.netlify/functions/api/v1/user", userRouter);
app.use("/.netlify/functions/api/v1/shopify", shopifyRouter);

module.exports = app;
module.exports.handler = serverless(app);
