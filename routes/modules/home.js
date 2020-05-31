const express = require('express')
const router = express.Router()
const request = require('request')
const URL = require('../../models/urls')
const linkPreviewGenerator = require("link-preview-generator");
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
        .then(() => {
          res.render('valid', { url, checkedShortURL })
          resolve(checkedShortURL)
        })
        .catch(error => console.log(error))
    })
  }

  // server save preview data
  const saveThumbnail = function (checkedShortURL, previewData) {
    return new Promise((resolve, rej) => {
      // const filter = { shorten: checkedShortURL }
      // const update = { img: previewData.img }
      // URL.findOneAndUpdate(filter, update, { new: true })


      URL.findOne({ shorten: checkedShortURL })
        .then(url => {
          if (previewData) {
            url.img = previewData.img
            url.title = previewData.title
            url.description = previewData.description
            url.domain = previewData.domain
            url.save()
          } else {
            console.log('can not get preview data...')
          }
        })
        .catch(error => console.log(error))
    })
  }

  async function shortenAsyncAwait() {
    const value = await urlCheck()
    const value1 = await generateShortURL(value, url)
    const value2 = await checkShortUrlDuplicated(value1)
    const value3 = await createData(value2)
    const previewData = await linkPreviewGenerator(url)
    const value4 = await saveThumbnail(value3, previewData)
  }
  shortenAsyncAwait()
})

module.exports = router