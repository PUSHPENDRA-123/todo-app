document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") return alert("Enter a valid task!");

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="removeTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function removeTask(button) {
    button.parentElement.parentElement.remove();
    saveTasks();
}

function editTask(button) {
    let li = button.parentElement.parentElement;
    let textSpan = li.querySelector("span");
    let newText = prompt("Edit your task:", textSpan.textContent);
    
    if (newText !== null && newText.trim() !== "") {
        textSpan.textContent = newText.trim();
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li span").forEach(span => {
        tasks.push(span.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="edit" onclick="editTask(this)">Edit</button>
                <button class="delete" onclick="removeTask(this)">Delete</button>
            </div>
        `;
        document.getElementById("taskList").appendChild(li);
    });
}
