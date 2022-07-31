
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;



var taskFormHandler = function(event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings- VALIDATE the form is filled out correctly
if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
}

    formEl.reset();

   // package up data as an object
   var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
   }

   // send it as an argument to createTaskEl
   createTaskEl(taskDataObj);
};



// Create new task HTML element
var createTaskEl = function(taskDataObj) {

     // create list item
     var listItemEl = document.createElement("li");
     listItemEl.className = "task-item";

     // add task id as a custom attribute
     listItemEl.setAttribute("data-task-id", taskIdCounter);
 
     //create div to hold task info and add to list item
     var taskInfoEl = document.createElement("div");
 
     //give it a class name
     taskInfoEl.className = "task-info";
 
     //add html content to div
     taskInfoEl.innerHTML = "<h3 class= 'task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
     listItemEl.appendChild(taskInfoEl);
 
     var taskActionsEl = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionsEl);
   

     //add entire list to item list
     tasksToDoEl.appendChild(listItemEl);

     //increase task counter for next unique id
     taskIdCounter++;

};

// function to dynamically create task actions like edit/delete

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //Create Edit Button

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //Create Delete Button

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // Create Dropdown Menu

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
    //create option element for dropdown menu
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);

    }

    return actionContainerEl;


};



formEl.addEventListener("submit", taskFormHandler);
