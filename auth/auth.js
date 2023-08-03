const jwt = require('jsonwebtoken')

const accessToken = {

  generateAccessToken(email) {
    let payload = {
    //   username,
      email
    }

    console.log("payload==",payload,"process.env.SECRET_TOKEN",process.env.SECRET_TOKEN)
    return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '1000h' });
  }
}

module.exports = accessToken;