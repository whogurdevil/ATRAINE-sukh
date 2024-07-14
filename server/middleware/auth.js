const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Adjusted to match 'Bearer ' format
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Pass decoded information directly
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};