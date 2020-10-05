const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  userId: {
    type: String,
  },
  originProduct: Object,
  exportedProduct: Object,
  isExport: Boolean,
});

module.exports = mongoose.model("Product", productSchema);
