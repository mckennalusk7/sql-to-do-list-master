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

  console.log(taskInput);
  clearTask();
}

function clearTask() {
  $("#js-input-list").val("");
}

// let taskToBeCompleted = {
//   task: $("#taskIn").val(),
//   taskCompleted: $("#taskCompletedIn").val(),
// };

// console.log(taskToBeCompleted);

// $.ajax({
//   method: "POST",
//   url: "/todo",
//   data: taskToDo,
// })
//   .then(function (response) {
//     console.log(response);
//     getKoalas();
//   })
//   .catch(function (error) {
//     console.log("error in koala post", error);
//   });

// render to DOM
