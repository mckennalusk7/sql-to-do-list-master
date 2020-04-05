const pg = require("pg");
const Pool = pg.Pool;

// Configuring the pool connection from the server to the database
const pool = new Pool({
  database: "weekend-to-do-app", // name of database
  host: "localhost",
  port: 5432,
  max: 10, // 10 connections (queries) at once
  idleTimeoutMillis: 10000, // 10 seconds to try to connect
});

pool.on("connect", () => {
  console.log("Connected to Postgresql pool");
});

pool.on("error", (error) => {
  console.log("Error with Postgresql pool: ", error);
});

module.exports = pool;
