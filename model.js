const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/products");
const Schema = mongoose.Schema;
const productData = new Schema({
    name: String,
    description: String,
    quantity: String,
    category: String,
    image: [],
    description: String,
    price: String
})
module.exports = mongoose.model('products', productData);