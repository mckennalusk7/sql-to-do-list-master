const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

router.get("/", (req, res) => {});

router.put("/", (req, res) => {});

router.delete("/", (req, res) => {});

module.exports = router;
