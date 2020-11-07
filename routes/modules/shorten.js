const express = require('express')
const router = express.Router()
const URL = require('../../models/urls')

// redirect to origin url
router.get('/:shorten', async (req, res) => {
  try {
    const { shorten } = req.params
    // redirect first
    const id = await URL.findOne({ shorten: shorten }).lean()
      .then(url => {
        res.redirect(`${url.origin}`)
        return url._id
      }).catch(error => console.log(error))

    // update shortened URL click count
    URL.findById(id)
      .then(url => {
        url.click += 1
        url.save()
      }).catch(error => console.log(error))
  } catch (err) {
    console.log(err)
  }
})

module.exports = router