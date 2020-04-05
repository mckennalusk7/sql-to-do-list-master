const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

//ROUES FOR TASKS
const taskRouter = require("./routes/task.router");

app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/todo", taskRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
