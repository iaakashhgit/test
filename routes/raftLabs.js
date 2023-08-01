const express = require('express')
const router = express.Router()
const raftLabsFunction = require('../controllers/raftLabs')

router.get("/",raftLabsFunction.raftLabs)

module.exports = router