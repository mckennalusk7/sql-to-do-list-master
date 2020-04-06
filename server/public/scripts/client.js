$(document).ready(init);

let task = [];

function init() {
  $("#js-add-button-task").on("click", submitTask);
  $(".js-output-task").on("click", ".js-btn-complete", updateTask);
  $(".js-output-task").on("click", ".js-btn-delete", deleteTask);

  getTask();
}

function submitTask(event) {
  event.preventDefault();

  const dataForServer = {
    task: $("#js-input-task").val(),
  };
  postTask(dataForServer);
}

// call to server to get completed tasks
function getTask() {
  $.ajax({
    type: "GET",
    url: "/todo",
  })
    .then((response) => {
      console.log(response);
      renderTask(response);
    })
    .catch((err) => {
      console.warn(err);
    });
}

// POST
function postTask(dataForServer) {
  $.ajax({
    type: "POST",
    url: "/todo",
    data: dataForServer,
  })
    .then((response) => {
      console.log(response);
      getTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function updateTask() {
  let taskComplete = "";
  let parentElement = $(this).parent().parent();

  if (parentElement.data("complete") == true) {
    taskComplete = "false";
  } else {
    taskComplete = "true";
  }

  const dataForServer = {
    complete: taskComplete,
  };
  console.log(dataForServer);

  const id = parentElement.data("id");

  $.ajax({
    method: "PUT",
    url: `/todo/${id}`,
    data: dataForServer,
  })
    .then((response) => {
      console.log("COMPLETE:", response);
      getTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function deleteTask() {
  console.log(deleteTask);
  let parentElement = $(this).parent().parent();
  const id = parentElement.data("id");

  $.ajax({
    method: "DELETE",
    url: `/todo/${id}`,
  })
    .then((response) => {
      console.log("DELETE: ", response);
      getTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

// render to DOM
function renderTask(response) {
  $(".js-output-task").empty();

  for (let task of response) {
    $(".js-output-task").append(`
    <div data-complete=${task.complete} data-id= ${task.id}>
    <span>${task.task} - <button class= "js-btn-complete"> Cha Ching</button> <button class="js-btn-delete"> Delete</button>
  </div>
    `);

    const newDiv = $(".js-output-task").children().last();
    if (newDiv.data("complete") == true) {
      newDiv.addClass("complete");
    }
  }
}
