const jwt = require('jsonwebtoken');
const SECRET_TOKEN = process.env.SECRET_TOKEN
const authenticateToken =(req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token not provided' });
  }
  jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired authentication token :(' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken
