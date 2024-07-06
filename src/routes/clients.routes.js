const { Router } = require("express");
const ClientController = require("../controllers/ClientController");

const clientsRoutes = new Router();
const clientsController = new ClientController();

clientsRoutes.post("/", (request, response) =>
  clientsController.criar(request, response)
);

module.exports = clientsRoutes;
