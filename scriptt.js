const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

/* =========================
   SAVE TO LOCAL STORAGE
========================= */

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* =========================
   RENDER TASKS
========================= */

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active")
            return !task.completed;

        if(currentFilter === "completed")
            return task.completed;

        return true;
    });

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className =
            `task ${task.completed ? "completed" : ""}`;

        li.dataset.id = task.id;

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">

                <button class="complete-btn">
                    ✓
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}

/* =========================
   CREATE TASK
========================= */

function addTask() {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e => {

    if(e.key === "Enter"){
        addTask();
    }
});

/* =========================
   EVENT DELEGATION
========================= */

taskList.addEventListener("click", e => {

    const taskItem = e.target.closest(".task");

    if(!taskItem) return;

    const taskId =
        Number(taskItem.dataset.id);

    const task =
        tasks.find(t => t.id === taskId);

    /* DELETE */

    if(e.target.classList.contains("delete-btn")){

        tasks =
            tasks.filter(
                t => t.id !== taskId
            );

        saveTasks();
        renderTasks();
    }

    /* COMPLETE */

    if(e.target.classList.contains("complete-btn")){

        task.completed =
            !task.completed;

        saveTasks();
        renderTasks();
    }

    /* UPDATE */

    if(e.target.classList.contains("edit-btn")){

        const newText =
            prompt(
                "Edit Task",
                task.text
            );

        if(newText &&
           newText.trim() !== ""){

            task.text =
                newText.trim();

            saveTasks();
            renderTasks();
        }
    }
});

/* =========================
   FILTERING
========================= */

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        filterBtns.forEach(
            b => b.classList.remove("active")
        );

        btn.classList.add("active");

        currentFilter =
            btn.dataset.filter;

        renderTasks();
    });
});

/* =========================
   INITIAL LOAD
========================= */

renderTasks();