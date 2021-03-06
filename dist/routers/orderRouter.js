"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _orderModel = _interopRequireDefault(require("../models/orderModel"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRouter = _express.default.Router();

orderRouter.get("/:id", _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({
      message: "Pedido não encontrado!"
    });
  }
}));
orderRouter.post("/", _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = new _orderModel.default({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    totalPrice: req.body.totalPrice
  });
  const createdOrder = await order.save();
  res.status(201).send({
    message: "Compra realizada com sucesso!",
    order: createdOrder
  });
}));
var _default = orderRouter;
exports.default = _default;