const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const request = require('request')
const URL = require('./models/urls')
const shortener = require('./shortener')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
mongoose.connect('mongodb://localhost/url_shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const { url } = req.body
  console.log(url)
  const urlCheckPromise = function () {
    return new Promise((resolve, reject) => {
      request({ url: url, method: 'HEAD' }, (err, res) => {
        const result = (!err && res.statusCode === 200) == true ? true : false
        //console.log(37, result)
        resolve(result)
      });
    })
  }

  urlCheckPromise()
    .then(function (value) {
      if (value) {        
        const shorten = shortener()  // 產生五碼英數組合
        return URL.create({ origin: url, shorten })
          .then(() => res.render('valid', { shorten }))
          .catch(error => console.log(error))
      } else {
        res.render('invalid', { url })
      }
    })
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})