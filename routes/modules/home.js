const express = require('express')
const router = express.Router()
const URL = require('../../models/urls')
const helpers = require('../../heplers')

// main page
router.get('/', (req, res) => {
  res.render('index', { urlCheck: true })
})

// URL invalid page
router.get('/error', (req, res) => {
  res.render('invalid')
})

router.post('/', async (req, res) => {
  try {
    const { url } = req.body
    const check = await helpers.urlCheck(url)
    // invalid url
    if (!check) return res.render('index', { url, urlCheck: check })
    
    // valid url
    let shortURL = await helpers.shortener()
    const checkedShortURL = await helpers.checkShortUrlDuplicated(shortURL)
    URL.create({ origin: url, shorten: checkedShortURL })
      .then(() => { return res.render('valid', { url, checkedShortURL }) })
      .then(() => {
        const metaData = helpers.getMetaData(url)
        return metaData
      })
      .then(metaData => {
        if (metaData) {
          return URL.findOne({ shorten: checkedShortURL })
            .then(url => {
              url.img = metaData.image
              url.title = metaData.title
              url.description = metaData.description
              url.save()
            })
        }
      }).catch(error => console.log(error))
  } catch (err) {
    console.log(err)
  }
})

module.exports = router