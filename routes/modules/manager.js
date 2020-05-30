const express = require('express')
const router = express.Router()
const request = require('request')
const URL = require('../../models/urls')

router.get('/', (req, res) => {
  return URL.find()
    .lean()
    .then(urls => {
      res.render('manager', { urls })
    })
    .catch(error => console.log(error))
})

module.exports = router