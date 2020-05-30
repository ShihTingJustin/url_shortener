const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const shorten = require('./modules/shorten')
const manager = require('./modules/manager')

router.use('/', home)
router.use('/s', shorten)
router.use('/manager', manager)

module.exports = router