const express = require('express')
const router = express.Router()
const request = require('request')
const URL = require('../../models/urls')

router.get('/', (req, res) => {
  res.render('manager')
})


module.exports = router