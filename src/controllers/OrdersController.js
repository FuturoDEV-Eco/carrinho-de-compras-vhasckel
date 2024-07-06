const Database = require("../database/connection");

class OrdersController {
  constructor() {
    this.db = new Database().database;
  }

  validateOrder(data) {
    if (
      !data.client_id ||
      !data.total ||
      !data.address ||
      !Array.isArray(data.items) ||
      data.items.length === 0
    ) {
      return {
        valid: false,
        message:
          "Os campos client_id, total, address e items são obrigatórios.",
      };
    }
    return { valid: true };
  }

  async criar(request, response) {
    try {
      const data = request.body;

      const validateOrder = this.validateOrder(data);
      if (!validateOrder.valid) {
        return response.status(400).json({ message: validateOrder.message });
      }

      const order = await this.db.query(
        `INSERT INTO orders(
        client_id,
        total,
        address,
        observations
        )
        values(
          $1,
          $2,
          $3,
          $4
          )
          returning id`,
        [data.client_id, data.total, data.address, data.observations]
      );

      if (order.rows.length === 0 || !order.rows[0].id) {
        throw new Error("Erro ao criar ordem. ID não encontrado.");
      }
      const orderID = order.rows[0].id;

      for (const item of data.items) {
        await this.db.query(
          `INSERT INTO orders_items(
                  order_id,
                  product_id,
                  amount,
                  price
                )
                  values(
                  $1,
                  $2,
                  $3,
                  $4
                  )`,
          [orderID, item.product_id, item.amount, item.price]
        );
        console.log(data);
      }

      response.status(201).json({ message: "Pedido realizado com sucesso!" });
    } catch (error) {
      console.error("Error executing query", error.stack);
      response
        .status(500)
        .json({ message: "não foi possível realizar pedido" });
    }
  }
}

module.exports = OrdersController;
