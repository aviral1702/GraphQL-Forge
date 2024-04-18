const {model, Schema} = require('mongoose');

const productsListSchema = new Schema({
    category: String,
    productName: String,
    price: Number,
    colors: Object,
    imgPath: String,
})

module.exports = model('products', productsListSchema);