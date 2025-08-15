const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../config');

exports.signToken = (id) => {
  return jwt.sign({ id }, config.SECRET_KEY, {
    expiresIn: config.JWT_EXPIRES_IN || '90d'
  });
};

exports.verifyToken = async (token) => {
  return await promisify(jwt.verify)(token, config.SECRET_KEY);
};