"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _data = _interopRequireDefault(require("./data"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = _interopRequireDefault(require("./config.js"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _orderRouter = _interopRequireDefault(require("./routers/orderRouter"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect(_config.default.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("Connected to mongoDB");
}).catch(error => {
  console.log(error.reason);
}); // routers


const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use("/api/orders", _orderRouter.default);
app.use("/api/users", _userRouter.default);
app.get("/api/products", (req, res) => res.send(_data.default.products));
app.get("/api/products/:id", (req, res) => {
  const product = _data.default.products.find(x => x._id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: "Produto não encontrado"
    });
  }
});
app.use(_express.default.static(_path.default.join(__dirname, '/../client')));
app.get('*', (req, res) => {
  res.sendFile(_path.default.join(__dirname, '/../client/index.html'));
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({
    message: err.message
  });
});
app.listen(5000, () => {
  console.log("serve at http://localhost:5000");
});