const express = require('express')
const router = express.Router()
const URL = require('../../models/urls')

// redirect to origin url
router.get('/:shorten', (req, res) => {
  const { shorten } = req.params
  URL.findOne({ shorten: shorten })
    .lean()
    .then(url => {
      res.redirect(`${url.origin}`)
    })
    .catch(error => console.log(error))
})

module.exports = router