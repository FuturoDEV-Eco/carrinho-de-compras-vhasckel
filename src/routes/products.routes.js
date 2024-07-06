const { Router } = require("express");
const ProductsController = require("../controllers/ProductsController");

const productsRoute = new Router();
const productsController = new ProductsController();

productsRoute.post("/", (request, response) =>
  productsController.criar(request, response)
);

productsRoute.get("/", (request, response) =>
  productsController.listar(request, response)
);

module.exports = productsRoute;
