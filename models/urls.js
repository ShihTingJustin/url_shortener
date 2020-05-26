const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = mongoose.Schema({
  origin: {
    type: String,
    require: true
  },
  shorten: {
    type: String,
    require: type
  }
})

module.exports = mongoose.model('URL', urlSchema)