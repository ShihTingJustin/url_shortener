const express = require('express')
const router = express.Router()
const request = require('request')
const URL = require('../../models/urls')
const shortener = require('../../shortener')

// main page
router.get('/', (req, res) => {
  res.render('index', { urlCheck: true })
})

// URL invalid page
router.get('/error', (req, res) => {
  res.render('invalid')
})

// URL shortener
router.post('/', (req, res) => {
  const { url } = req.body
  console.log(url)

  // check url available
  const urlCheck = function () {
    return new Promise((resolve, rej) => {
      request({ url: url, method: 'HEAD' }, (err, res) => {
        const result = (!err && res.statusCode === 200) == true ? true : false
        resolve(result)
      })
    })
  }

  // true: generate a shortened URL; false: render page by result
  const generateShortURL = function (urlCheck, url) {
    return new Promise((resolve, rej) => {
      if (urlCheck) {
        let shortURL = shortener()
        resolve(shortURL)
      } else {
        res.render('index', { url, urlCheck })
      }
    })
  }

  // check the shortened URL not duplicated
  const checkShortUrlDuplicated = function (shortURL) {
    return new Promise((res, rej) => {
      URL.findOne({ shorten: shortURL })
        .lean()
        .then(url => {
          let newShortURL = shortURL
          if (!url) {
            console.log(`'${newShortURL}' is not duplicated`)
            res(newShortURL)
          } else {
            console.log('duplicated! creating new ...')
            newShortURL = shortener()
            checkShortUrlDuplicated(newShortURL)
          }
        })
        .catch(error => console.log(error))
    })
  }

  // create data and render page
  const createData = function (checkedShortURL) {
    return new Promise((resolve, rej) => {
      URL.create({ origin: url, shorten: checkedShortURL })
        .then(() => res.render('valid', { url, checkedShortURL }))
        .catch(error => console.log(error))
    })
  }

  async function shortenAsyncAwait() {
    const value = await urlCheck()
    const value1 = await generateShortURL(value, url)
    const value2 = await checkShortUrlDuplicated(value1)
    const value3 = await createData(value2)
  }

  shortenAsyncAwait()
})

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