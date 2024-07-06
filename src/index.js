const express = require("express");

const clientsRoutes = require("./routes/clients.routes");
const productsRoute = require("./routes/products.routes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/clients", clientsRoutes);
app.use("/products", productsRoute);

app.listen(port, () => {
  console.log(`servidor online na porta ${port} ;)`);
});
