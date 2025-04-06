const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

class MySqlClient {
  _config = null;
  _pool = null;

  constructor() {
    this._config = {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'todo',
      connectionLimit: 10,
      namedPlaceholders: true,
      ssl: (process.env.MYSQL_SSL || "").toLocaleLowerCase() === 'true' ? {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(__dirname, './certs/azure-ca.pem'), 'utf8'),
      } : undefined
    };

    this._pool = mysql.createPool(this._config);
  }

  async executeQuery(query, parameters) {
    // const con = await mysql.createConnection(this.#config);
    // const [rows, fields] = await con.query(sql(name), parameters);
    // con.end();
    // return rows;
    const [rows] = await this._pool.query(query, parameters);
    return rows;
  }
}

module.exports = { MySqlClient };