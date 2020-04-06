const express = require("express");
const toDoRouter = express.Router();
const pool = require("../modules/pool");

// POST
toDoRouter.post("/", (req, res) => {
  const dataSentFromClient = req.body;

  const queryText = `INSERT INTO "todo" ("task", "task completed") VALUES ($1);`;

  pool
    .query(queryText, [
      dataSentFromClient.task,
      dataSentFromClient.taskCompleted,
    ])
    .then((responseDb) => {
      console.log(responseDb);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

// GET
toDoRouter.get("/", (req, res) => {
  const queryText = `SELECT * FROM "todo" ORDER BY "id";`;

  pool
    .query(queryText)
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.log(dbRows);
      res.send(dbRows);
    })
    .catch((err) => {
      console.log("ERROR: NOT HERE", err);
      res.sendStatus(500);
    });
});

// PUT
toDoRouter.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const newTaskData = req.body;
  const queryText = `UPDATE: "todo" SET "completed"=$1 WHERE id=$2;`;

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
toDoRouter.delete("/:id", (req, res) => {
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

module.exports = toDoRouter;
