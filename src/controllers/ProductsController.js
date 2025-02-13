const Database = require("../database/connection");

class ProductController {
  constructor() {
    this.db = new Database().database;
  }

  validateProduct(data) {
    if (!data.name || !data.category_id) {
      return {
        valid: false,
        message: "O nome do produto e sua categoria são necessários",
      };
    }
    if (data.voltage && !["110", "220"].includes(data.voltage)) {
      return {
        valid: false,
        message: "A voltagem pode ser apenas 110 ou 220",
      };
    }
    return { valid: true };
  }

  async criar(request, response) {
    try {
      const data = request.body;

      const validate = this.validateProduct(data);
      if (!validate.valid) {
        return response.status(400).json({ message: validate.message });
      }

      await this.db.query(
        `INSERT INTO products(
              name,
              amount,
              color,
              voltage,
              description,
              category_id
            )
              values(
              $1,
              $2,
              $3,
              $4,
              $5,
              $6
              )`,
        [
          data.name,
          data.amount,
          data.color,
          data.voltage,
          data.description,
          data.category_id,
        ]
      );
      console.log(data);

      response.status(201).json({ message: "Produto cadastrado!" });
    } catch (error) {
      console.error("Error executing query", error.stack);
      response
        .status(500)
        .json({ message: "não foi possível cadastrar produto" });
    }
  }

  async listar(request, response) {
    try {
      const data = request.query;

      let products;
      if (data.nome) {
        products = await this.db.query(
          "SELECT * FROM products where name LIKE $1",
          [`%${data.name}%`]
        );
        response.status(200).json(products.rows);
      } else {
        products = await this.db.query("SELECT * FROM products");
        response.status(200).json(products.rows);
      }
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      response
        .status(500)
        .json({ message: "Não foi possível listar produtos." });
    }
  }

  async detalhes(request, response) {
    try {
      const id = request.params.id;

      const product = await this.db.query(
        `SELECT 
          p.id, p.name, p.amount, p.color, p.voltage, p.description,
          c.id as category_id, c.name as category_name
        FROM 
          products p
        JOIN 
          categories c
        ON 
          p.category_id = c.id
        WHERE 
          p.id = $1`,
        [id]
      );

      if (product.rows.length === 0) {
        return response
          .status(404)
          .json({ message: "Produto não encontrado." });
      }

      response.json(product.rows[0]);
    } catch (error) {
      console.error("Erro ao buscar detalhes do produto:", error);
      response
        .status(500)
        .json({ message: "Não foi possível buscar detalhes do produto." });
    }
  }
}

module.exports = ProductController;
