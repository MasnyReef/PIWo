let taskList = [];
let taskStatus = []; // tablica przechowująca statusy zadań i ich daty wykonania
let removedTask;
let removedDate;
let remowedIndex;


function addTask() {
    let taskInput = document.getElementById("taskInput");
    let newTask = taskInput.value.trim();
    if (newTask !== "") { // sprawdzamy, czy pole tekstowe z zadaniem nie jest puste
        taskList.push(newTask);
        taskStatus.push({ done: false, date: null }); 
        taskInput.value = "";
        displayTasks();
    }
}

function undo(){
    taskList.splice(remowedIndex,0,removedTask);
    taskStatus.splice(remowedIndex,0,removedDate);

    $("#undoButton").hide(); 
    displayTasks();
}
  

function removeTask(index) {
    removedTask = taskList[index];
    removedDate = taskStatus[index];
    remowedIndex = index;

    taskList.splice(index, 1);
    taskStatus.splice(index, 1);

    $("#undoButton").show();

    displayTasks();
}

function toggleDone(index) {
    taskStatus[index].done = !taskStatus[index].done; // zmieniamy status zadania na przeciwny
    taskStatus[index].date = taskStatus[index].done ? new Date() : null; // jeśli zadanie zostało oznaczone jako zrobione, ustawiamy dla niego datę wykonania
}


function displayTasks() {
    let taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";
  
    for (let i = 0; i < taskList.length; i++) {
        let task = null;
        let taskElement = document.createElement("li");
        taskElement.innerHTML = task;

        let taskText = document.createElement("span");
        taskText.innerHTML = taskList[i] + " ";
        taskElement.appendChild(taskText);

        let dateElement; 

        let removeButton = $("<button>Usuń</button>");
        removeButton.attr("data-index", i); // Dodanie atrybutu data-index z indeksem elementu
        removeButton.click(function() {
            if (confirm("Czy na pewno chcesz usunąć to zadanie?")) { // Wyświetlenie modal-a z zapytaniem o potwierdzenie
            removeTask($(this).attr("data-index")); // Wywołanie funkcji removeTask() z indeksem elementu
            }
        });
        taskElement.append(removeButton.get(0));
        

        if(taskStatus[i].done){
            taskText.classList.add("done");
            dateElement = document.createElement("span"); 
            dateElement.innerHTML = " ( " + taskStatus[i].date.toLocaleString() + " )";
            taskElement.appendChild(dateElement);
        }

    
        taskElement.addEventListener("click", function(event) {
            if (!event.target.matches("button")) { // Sprawdzamy, czy nie kliknięto po prostu na przycisk usuwania
                if (taskText.classList.contains("done")) {
                    taskText.classList.remove("done");
                    taskElement.removeChild(dateElement);
                } 
                else {
                    taskText.classList.add("done");
                    dateElement = document.createElement("span");
                    dateElement.innerHTML = " ( " + new Date().toLocaleString() + " )";
                    taskElement.appendChild(dateElement);
                }
                toggleDone(i);
            }
        });
        
        taskListElement.appendChild(taskElement);
    }
}
  

displayTasks();

