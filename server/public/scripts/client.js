$(document).ready(init);

function init() {
  console.log("LETS GO!");
}

// let task = [];

$("#js-submit-task").on("submit", submitTask);
// $("#js-task-completion").on("click", ".js-btn-delete-task", deleteTask);
// $(".js-task-completion").on("click", ".js-btn-completed-task", completedTask);

function submitTask(event) {
  event.preventDefault();

  const taskInput = $("#js-input-list").val();

  completedTask(taskInput);

  clearTask();
}

function completedTask(task) {
  const dataForServer = {
    task: task,
  };

  $.ajax({
    type: POST,
    url: "/task",
    data: dataForServer,
  });
}

function clearTask() {
  $("#js-input-list").val("");
}

// let taskToBeCompleted = {
//   task: $("#taskIn").val(),
//   taskCompleted: $("#taskCompletedIn").val(),
// };

// console.log(taskToBeCompleted);
