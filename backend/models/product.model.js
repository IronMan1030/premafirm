const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    userId: {
        type: String,
    },
    product: {
        productId: {
            type: String,
        },
        default_code: {
            type: String,
        },
        name: {
            type: String,
        },
        list_price: {
            type: String,
        },
        qty_available: {
            type: String,
        },
        virtual_available: {
            type: String,
        },
        categ_id: {
            name: { type: String },
        },
        uom_id: { type: String },
        description: { type: String },
        images: [String],
        product_variant_ids: [Object],
    },
});

module.exports = mongoose.model("Product", productSchema);
