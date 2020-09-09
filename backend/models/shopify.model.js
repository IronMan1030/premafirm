const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopifySchema = new Schema({
    authTokenInfo: {
        type: Object,
    },
});

module.exports = mongoose.model("Shopify", shopifySchema);
