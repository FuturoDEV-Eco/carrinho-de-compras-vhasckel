const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");

const ordersRoute = new Router();
const ordersController = new OrdersController();

ordersRoute.post("/", (request, response) =>
  ordersController.criar(request, response)
);

module.exports = ordersRoute;
