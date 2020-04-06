const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "todo" ORDER BY "id";`;

  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
  console.log(req.body);
  const queryText = `INSERT INTO "todo" ("task", "task completed") VALUES ($1, false);`;

  pool
    .query(queryText, [req.body.task])
    .then((response) => {
      console.log(response);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

// PUT
router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const newTaskData = req.body;
  const queryText = `UPDATE: "todo" SET "task completed"=$1 WHERE id=$2;`;

  pool
    .query(queryText, [newTaskData.taskCompleted, taskId])
    .then((responseDb) => {
      console.log(responseDb);
      res.sendStatus(200); // OK
    })
    .catch((err) => {
      console.log(`Error in completion: ${err}`);
      res.sendStatus(500); //internal server error
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  const queryText = `DELETE FROM "todo" WHERE id=$1;`;

  pool
    .query(queryText, [req.params.id])
    .then((response) => {
      console.log("DELETE:", response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

module.exports = router;
