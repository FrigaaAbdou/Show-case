// models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgLink: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);