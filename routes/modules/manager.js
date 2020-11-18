const express = require('express')
const router = express.Router()
const URL = require('../../models/urls')


router.get('/', (req, res) => {
  return URL.find()
    .lean()
    .then(urls => {
      res.render('manager', { urls })
    })
    .catch(error => console.log(error))
})


router.post('/:id', (req, res) => {
  const { id } = req.params
  return URL.findById(id)
    .then(url => url.remove())
    .then(() => res.redirect('/manager'))
    .catch(error => console.log(error))
})

module.exports = router