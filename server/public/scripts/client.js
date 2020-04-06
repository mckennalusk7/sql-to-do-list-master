$(document).ready(init);

let task = [];

function init() {
  $("js-add-button-task").on("click", submitTask);
  // $("#taskIn").on("click", "#js-btn-delete-task", deleteTask);
  // $("#taskIn").on("click", "#js-submit-task", updateToDoList);
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

// function updateTask() {
//   console.log("COMPLETE: ", completed);
//   const completed = {
//     completed: $(this).parent().data("completed"),
//   };
//   const taskId = $(this).parent().data("completed");

//   $.ajax({
//     method: "PUT",
//     url: `/todo/${taskId}`,
//     data: completed,
//   })
//     .then((response) => {
//       console.log("COMPLETE:", response);
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
// function saveTask(newTask) {
//   console.log("in saveTask", newTask);
// }

// function clearTask() {
//   $("#js-input-list").empty();
// }
