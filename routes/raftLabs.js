const express = require('express')
const router = express.Router()
const raftLabsFunction = require('../controllers/raftLabs')
const validate = require('../validations/validate')
const postDataValidate = require('../validations/validator')



// router.post("/postData",raftLabsFunction.raftLabsCreate)
router.post("/postData",validate(postDataValidate.postData),raftLabsFunction.raftLabsCreate)
router.get("/getData",raftLabsFunction.getData)
router.put('/updateData',raftLabsFunction.updateData)
router.delete('/deleteData',raftLabsFunction.deleteData)
router.post('/getAllData',raftLabsFunction.getAllData)

module.exports = router