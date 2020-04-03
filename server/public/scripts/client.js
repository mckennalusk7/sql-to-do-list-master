$(document).ready(init);

function init() {
  console.log("JQ running");

  $("#js-submit-task").on("submit", submitTask);
}

function submitTask(event) {
  event.preventDefault();

  const taskInput = $("#js-input-list").val();

  console.log(taskInput);
}
