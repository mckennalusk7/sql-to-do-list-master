const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.post("/", (req, res) => {
  const querySting = `INSERT INTO "weekend-to-do-app" ("task") VALUES ($1);`;

  pool
    .query(queryString, [req.body.task])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.send(500);
    });
});

router.get("/", (req, res) => {});

router.put("/", (req, res) => {});

router.delete("/", (req, res) => {});

module.exports = router;
