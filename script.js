const form = document.querySelector(".input-text-container");
const formInput = document.querySelector(".input-text");
const tasksList = document.querySelector(".tasks-list");
const stats = document.querySelector(".stats");
const statsAll = document.querySelector(".stats-all");
const statsDone = document.querySelector(".stats-done");

let tasksFinishedCounter = 0;
let tasksCounter = 0;

const updateStats = function (tasks, tasksFinished) {
  if (tasksCounter === 0 && tasksFinishedCounter === 0) {
    stats.textContent = `Start adding tasks to your tasks list!`;
  } else {
    stats.textContent = `You have ${tasksCounter} tasks on your list, and you already finished ${tasksFinishedCounter} (${Math.round(
      (tasksFinishedCounter / tasksCounter) * 100
    )}%)`;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  tasksCounter++;
  updateStats(tasksCounter, tasksFinishedCounter);
  const html = `<div class="task">
      <input class="task-checkbox" type="checkbox" name="task${tasksCounter}" id="task${tasksCounter}" />
      <label class="">${formInput.value}</label>
      <button class="btn--delete">
        <ion-icon class="icon" name="trash"></ion-icon>
      </button>
    </div>`;
  tasksList.insertAdjacentHTML("afterbegin", html);
  form.reset();
});

tasksList.addEventListener("change", (e) => {
  if (e.target.matches(".task-checkbox")) {
    const label = e.target.nextElementSibling;
    label.classList.toggle("marked");
    if (label.classList.contains("marked")) {
      tasksFinishedCounter++;
      updateStats(tasksCounter, tasksFinishedCounter);
    } else {
      tasksFinishedCounter--;
      updateStats(tasksCounter, tasksFinishedCounter);
    }
  }
});

tasksList.addEventListener("click", (e) => {
  if (e.target.matches(".icon")) {
    const label = e.target.parentElement.previousElementSibling;
    const task = e.target.parentElement.parentElement;
    if (label.classList.contains("marked")) {
      tasksCounter--;
      tasksFinishedCounter--;
      updateStats(tasksCounter, tasksFinishedCounter);
    } else {
      tasksCounter--;
      updateStats(tasksCounter, tasksFinishedCounter);
    }
    task.remove();
  }
});
