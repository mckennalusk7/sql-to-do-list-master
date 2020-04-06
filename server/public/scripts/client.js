$(document).ready(init);

let task = [];

function init() {
  $("js-add-button-task").on("click", submitTask);
  $(".js-output-task").on("click", ".js-btn-complete", updateTask);
  // $(".js-output-task").on("click", "#js-submit-task", updateToDoList);
  getTask();
}

function submitTask(event) {
  event.preventDefault();

  const dataForServer = {
    name: $("#js-input-task").val(),
  };
  postTask(dataForServer);
  //  clear input values
  clearTask();
}

// call to server to get completed tasks --- GETTING ERRORS!!!!!
function getTask() {
  $.ajax({
    type: "GET",
    url: "/todo",
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.warn(err);
      renderTask(response);
    });
}

// Not sending to server
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
  let parentElement = $(this).parent();

  if (parentElement.data("complete") === "true") {
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

// function deleteTask() {
//   const taskId = $(this).parent().data("id");

//   $.ajax({
//     method: "DELETE",
//     url: `/todo/${taskId}`,
//   })
//     .then((response) => {
//       console.log("DELETE: ", response);
//       getTask();
//     })
//     .catch((err) => {
//       console.warn(err);
//     });
// }

// render to DOM
function renderTask(response) {
  $(".js-output-task").empty();

  for (let task of response) {
    $(".js-output-task").append(`
      <div data-complete=${task.complete} data-id= ${task.id}>
        <span>${task.task} - <button class= "js-btn-complete"> Cha Ching</button> <button "js-btn-delete"> Delete</button>
      </div>
    `);
  }
}
// function saveTask(newTask) {
//   console.log("in saveTask", newTask);
// }

// function clearTask() {
//   $("#js-input-list").empty();
// }
