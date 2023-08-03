const express = require('express')
const router = express.Router()
const authentication = require('../controllers/authentication')
const validate = require('../validations/validate')
const registerUserVal = require('../validations/validator')

router.post("/registerUser",validate(registerUserVal.registerUser),authentication.registerUser);
router.post("/signin",authentication.login)

module.exports = router