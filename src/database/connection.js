const { Pool } = require("pg");

class Database {
  constructor() {
    this.database = new Pool({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "1234",
      database: "lab_commerce",
    });

    this.database.connect((err) => {
      if (err) {
        console.error("Connection error", err.stack);
      } else {
        console.log("Conectado ao banco de dados!");
      }
    });
  }
}

module.exports = Database;
