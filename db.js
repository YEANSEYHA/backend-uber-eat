const Pool = require("pg").Pool;

// Config here

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "uber-eat",
  password: "123456",
  port: 5432,
});

module.exports = pool;
