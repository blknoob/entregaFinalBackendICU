const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  status: { type: Boolean, default: true },
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('product', productSchema, 'products');

module.exports = Product;