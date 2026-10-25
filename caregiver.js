const taskStorageKey = "myecho-custom-tasks-v1";
const newTaskInput = document.getElementById("new-task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskAddStatus = document.getElementById("task-add-status");
const statHeading = document.getElementById("stat-tasks-heading");

function getCustomTasks() {
    try {
        return JSON.parse(localStorage.getItem(taskStorageKey) || "[]");
    } catch (e) {
        return [];
    }
}

function updateTaskStat() {
    const tasks = getCustomTasks();
    statHeading.textContent = `${tasks.length} custom tasks added`;
}
updateTaskStat();


addTaskBtn.addEventListener("click", function() {
    const taskText = newTaskInput.value.trim();
    if (!taskText) {
        taskAddStatus.textContent = "Please enter a task description.";
        return;
    }

    const tasks = getCustomTasks();
    tasks.push({ title: taskText, done: false });
    localStorage.setItem(taskStorageKey, JSON.stringify(tasks));

    newTaskInput.value = "";
    taskAddStatus.textContent = "Task successfully added to patient's daily checklist! 💙";
    updateTaskStat();
});




const memoryKey = "myecho-custom-memories-v1";
const memTitleInput = document.getElementById("memory-title-input");
const memDescInput = document.getElementById("memory-desc-input");
const addMemoryBtn = document.getElementById("add-memory-btn");
const memoryAddStatus = document.getElementById("memory-add-status");



addMemoryBtn.addEventListener("click", function() {
    const title = memTitleInput.value.trim();
    const desc = memDescInput.value.trim();


    if (!title || !desc) {
        memoryAddStatus.textContent = "Please fill in both title and description.";
        return;
    }

    try {
        const memories = JSON.parse(localStorage.getItem(memoryKey) || "[]");
        memories.push({ title, desc });
        localStorage.setItem(memoryKey, JSON.stringify(memories));

        memTitleInput.value = "";
        memDescInput.value = "";
        memoryAddStatus.textContent = "Memory card added to patient's gallery! 📸";
    } catch (e) {
        memoryAddStatus.textContent = "Could not save memory.";
    }
});





const safetyInput = document.getElementById("safety-location-input");
const saveSafetyBtn = document.getElementById("save-safety-location");
const safetyStatus = document.getElementById("safety-status");
const safetyKey = "myecho-familiar-place";

const existingPlace = localStorage.getItem(safetyKey);
if (existingPlace) {
    safetyInput.value = existingPlace;
}

saveSafetyBtn.addEventListener("click", function() {
    const place = safetyInput.value.trim();
    if (!place) {
        safetyStatus.textContent = "Please enter a location.";
        return;
    }

    localStorage.setItem(safetyKey, place);
    safetyStatus.textContent = "Patient location updated successfully! 📍💙";
});