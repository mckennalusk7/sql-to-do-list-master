$(document).ready(init);

let task = [];

function init() {
  $("#js-submit-task").on("submit", submitTask);
  // $("#js-task-completion").on("click", ".js-btn-delete-task", deleteTask);
  // $(".js-task-completion").on("click", ".js-btn-completed-task", completedTask);
  getTask();
}

function submitTask(event) {
  event.preventDefault();

  const taskInput = $("#js-input-list").val();

  postTask(taskInput);

  clearTask();
}

function postTask(task) {
  const dataForServer = {
    task: task,
  };

  $.ajax({
    type: "POST",
    url: "/task",
    data: dataForServer,
  })
    .then((response) => {
      getTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function getTask() {
  $.ajax({
    type: "GET",
    url: "/task",
  })
    .then((response) => {
      task = response;
      renderTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function deleteTask() {
  const taskId = $(this).parent().data("id");

  $.ajax({
    type: "DELETE",
    url: `/cat/${taskId}`,
  })
    .then((response) => {
      getTask();
    })
    .catch((err) => {
      console.warn(err);
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
