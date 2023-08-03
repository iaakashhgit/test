const joi = require('joi')

const registerUser = {
    body: joi.object().keys({
        email: joi.string().required(),
        age: joi.number().required(),
        name: joi.string().required(),
        address: joi.string().required(),
        location: joi.string(),
        plainPass: joi.string().required(),
    })
}

const postData = {
    body: joi.object().keys({
        name: joi.string().required(),
        age: joi.number().required(),
        address: joi.string().required(),
    })
}

module.exports = { registerUser, postData }