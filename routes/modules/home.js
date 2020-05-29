const express = require('express')
const router = express.Router()
const request = require('request')
const URL = require('../../models/urls')
const shortener = require('../../shortener')

router.get('/', (req, res) => {
  res.render('index', { urlCheck: true })
})

router.get('/error', (req, res) => {
  res.render('invalid')
})

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

  // create and render page by result
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

  const checkShortUrlRepeat = function (shortURL) {
    return new Promise((res, rej) => {
      URL.find({ shorten: shortURL })
        .then(url => {
          let newShortURL = shortURL
          if (url.length === 0) {
            console.log(`'${newShortURL}' is not repeat`)
            res(newShortURL)
          } else if (url.length > 0) {
            console.log('repeat! creating new ...')
            newShortURL = shortener()
            checkShortUrlRepeat(newShortURL)
          }
        })
        .catch(error => console.log(error))
    })
  }

  // create data
  const createData = function (checkedShortURL) {
    return new Promise((resolve, rej) => {
      console.log(74, checkedShortURL)
      URL.create({ origin: url, shorten: checkedShortURL })
        .then(() => res.render('valid', { url, checkedShortURL }))
        .catch(error => console.log(error))
    })
  }

  async function shortenAsyncAwait() {
    const value = await urlCheck()
    const value1 = await generateShortURL(value, url)
    const value2 = await checkShortUrlRepeat(value1)
    const value3 = await createData(value2)
  }

  shortenAsyncAwait()
})
// redirect to origin url
router.get('/:shorten', (req, res) => {
  const { shorten } = req.params
  URL.find({ shorten: shorten })
    .lean()
    .then(url => {
      console.log(58, shorten, url[0].origin)
      res.redirect(`${url[0].origin}`)
    })
    .catch(error => console.log(error))
})

module.exports = router