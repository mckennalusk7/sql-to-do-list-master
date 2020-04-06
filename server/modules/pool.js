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
  console.log("Connected to pool");
});

pool.on("error", (err) => {
  console.warn(`Error with pool: ${err}`);
});

module.exports = pool;
