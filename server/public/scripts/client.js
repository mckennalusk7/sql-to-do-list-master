$(document).ready(init);

let task = [];

$("#js-submit-task").on("submit", submitTask);
$("#js-task-completion").on("click", ".js-btn-delete-task", deleteTask);
$(".js-task-completion").on("click", ".js-btn-completed-task", completedTask);

function submitTask(event) {
  event.preventDefault();

  const taskInput = $("#js-input-list").val();

  clearTask();

  console.log(taskInput);
}
