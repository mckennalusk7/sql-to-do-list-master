$(document).ready(init);

let task = [];

function init() {
  $("#js-submit-task").on("submit", submitTask);
  $("#taskIn").on("click", "#js-btn-delete-task", deleteTask);
  $("#taskIn").on("click", "#js-submit-task", updateToDoList);
  getTask();
}

function submitTask(event) {
  event.preventDefault();

  const taskInput = $("#js-input-list").val();

  postTask(taskInput);
  //  clear input values
  clearTask();
}

function postTask(task) {
  const dataForServer = {
    task: task,
  };

  $.ajax({
    method: "POST",
    url: "/todo",
    data: dataForServer,
  })
    .then((response) => {
      "UPDATE: ", response;
      getTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

// call to server to get completed tasks --- GETTING ERRORS!!!!!
function getTask() {
  $.ajax({
    method: "GET",
    url: "/todo",
  })
    .then((response) => {
      task = response;
      console.log("array of tasks completed", task);
      renderTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function deleteTask() {
  const taskId = $(this).parent().data("id");

  $.ajax({
    method: "DELETE",
    url: `/todo/${taskId}`,
  })
    .then((response) => {
      console.log("DELETE: ", response);
      getTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function updateToDoList() {
  console.log("COMPLETE: ", completed);
  const completed = {
    completed: $(this).parent().data("completed"),
  };
  const taskId = $(this).parent().data("completed");

  $.ajax({
    method: "PUT",
    url: `/todo/${taskId}`,
    data: completed,
  })
    .then((response) => {
      console.log("COMPLETE:", response);
      getTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

// save entered task
function saveTask(newTask) {
  console.log("in saveTask", newTask);
}

// render to DOM
function renderTask() {
  $("#js-submit-task").empty();

  for (let task of task) {
    let taskCompleted = `<button class="js-submit-task" data-id="${task.id}">Submit Task</button>`;
    if (task.taskCompleted === true) {
      taskCompleted = `<button class="js-submit-task" data-id="${task.id}">Submit Task</button>`;
    }
    $("#js-submit-task").append(`
      <tr>
        <td>${task.task}</td>
        <td>${task.taskCompleted}</td>
        <td>${taskCompleted}</td>
        <<button class="js-btn-delete-task" data-id="${task.id}">Delete</button>
      </tr>
    `);
  }
}
function saveTask(newTask) {
  console.log("in saveTask", newTask);
}

function clearTask() {
  $("#js-input-list").empty();
}
