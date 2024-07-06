const Database = require("../database/connection");

class ClientController {
  constructor() {
    this.db = new Database().database;
  }

  validateClient(data) {
    if (!data.name || !data.email || !data.cpf || !data.contact) {
      return {
        valid: false,
        message: "O campo nome, e-mail, CPF e contato são obrigatórios.",
      };
    }
    return { valid: true };
  }

  async criar(request, response) {
    try {
      const data = request.body;

      const validate = this.validateClient(data);
      if (!validate.valid) {
        return response.status(400).json({ message: validate.message });
      }

      await this.db.query(
        `INSERT INTO clients(
              name,
              email,
              cpf,
              contact
            )
              values(
              $1,
              $2,
              $3,
              $4
              )`,
        [data.name, data.email, data.cpf, data.contact]
      );
      console.log(data);

      response.status(201).json({ message: "Cadastrado!" });
    } catch (error) {
      console.error("Error executing query", error.stack);
      response
        .status(500)
        .json({ message: "não foi possível cadastrar cliente" });
    }
  }
}

module.exports = ClientController;
