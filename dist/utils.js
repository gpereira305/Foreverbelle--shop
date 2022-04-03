"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = exports.generateToken = void 0;

var _config = _interopRequireDefault(require("./config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generateToken = user => {
  return _jsonwebtoken.default.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, _config.default.JWT_SECRET);
};

exports.generateToken = generateToken;

const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    res.status(401).send({
      message: "Token não fornecido!"
    });
  } else {
    const token = bearerToken.slice(7, bearerToken.length);

    _jsonwebtoken.default.verify(token, _config.default.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({
          message: "Token inválido"
        });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

exports.isAuth = isAuth;