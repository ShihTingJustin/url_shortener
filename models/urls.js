const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = mongoose.Schema({
  origin: {
    type: String,
    require: true
  },
  shorten: {
    type: String,
    require: true,
    unique: true
  },
  click: {
    type: Number,
    default: '0'
  }
})

module.exports = mongoose.model('URL', urlSchema)