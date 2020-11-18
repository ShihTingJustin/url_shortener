const URL = require('./models/urls')
const axios = require('axios')
const got = require('got')
const metascraper = require('metascraper')([
  require('metascraper-image')(),
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-url')()
])


module.exports = {
  shortener: () => {
    let shorten = []
    shorten.push(Math.floor(Math.random() * 10))

    for (let i = 0; i < 4; i++) {
      // random number
      const randomNum = Math.floor(Math.random() * 10)

      // random upper case
      let randomAtoZ = Math.floor(Math.random() * 26)
      const upperCase = String.fromCharCode(65 + randomAtoZ)

      // random lower case
      randomAtoZ = Math.floor(Math.random() * 26)
      const lowerCase = String.fromCharCode(65 + randomAtoZ).toLowerCase()

      // generate random character
      const randomIdx = Math.floor(Math.random()
        * 3)
      switch (randomIdx) {
        case 0:
          shorten.push(randomNum)
          break

        case 1:
          shorten.push(upperCase)
          break

        case 2:
          shorten.push(lowerCase)
      }
    }
    // array to string without commas 
    shorten = shorten.join('')
    return shorten
  },

  urlCheck: (url) => {
    return (async () => {
      try {
        const res = await axios.get(url)
        return (res.status === 200) ? true : false
      } catch (err) {
        console.log(err)
      }
    })()
  },

  checkShortUrlDuplicated: (shortURL) => {
    return URL.findOne({ shorten: shortURL })
      .lean()
      .then(url => {
        let newShortURL = shortURL
        if (!url) {
          console.log(`${newShortURL} is not duplicated`)
          return newShortURL
        } else {
          console.log('duplicated! creating new ...')
          newShortURL = shortener()
          checkShortUrlDuplicated(newShortURL)
        }
      }).catch(error => console.log(error))
  },

  getMetaData: (targetUrl) => {
    return (async () => {
      const { body: html, url } = await got(targetUrl)
      return await metascraper({ html, url })
    })()
  }

}



