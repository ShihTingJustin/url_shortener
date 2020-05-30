const express = require('express')
const router = express.Router()
const URL = require('../../models/urls')

// redirect to origin url
router.get('/:shorten', (req, res) => {
  const { shorten } = req.params
  // redirect first
  const redirect = function () {
    return new Promise((resolve, rej) => {
      URL.findOne({ shorten: shorten })
        .lean()
        .then(url => {
          resolve(url._id)
          res.redirect(`${url.origin}`)
        })
        .catch(error => console.log(error))
    })
  }

  // update shortened URL click count
  const updateClickCount = function (id) {
    return new Promise((res, rej) => {      
      URL.findById(id)
        .then(url => {
          url.click += 1
          url.save()
        })
        .catch(error => console.log(error))
    })
  }

  async function updateClickAsyncAwait() {
    const value = await redirect()
    const value1 = await updateClickCount(value)
  }

  updateClickAsyncAwait()
})

module.exports = router