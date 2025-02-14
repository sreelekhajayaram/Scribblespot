const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    imageurl:String,
    price:Int
});

// Create the Product Model
const product = mongoose.model('products', productSchema);

module.exports = product;