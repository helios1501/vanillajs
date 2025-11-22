const input = document.querySelector("[data-cmnjs-input]");
const listTodo = document.querySelector(".list-to-do");
const btnAdd = document.querySelector("[data-cmnjs-btn-add]");

// Utils
function randomId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function getStore() {
  return JSON.parse(localStorage.getItem("list-task")) || [];
}

function setStore(list) {
  localStorage.setItem("list-task", JSON.stringify(list));
}

// Render HTML
function renderItem({ id, name, isDone }) {
  return `
    <li id="${id}">
      <div class="wrap-to-do">
        <div class="wrap-text">
          <input type="checkbox" ${isDone ? "checked" : ""}>
          <p class="task ${isDone ? "done" : ""}">${name}</p>
        </div>
        <p class="wrap-btn-del"><button data-delete>DEL</button></p>
      </div>
    </li>
  `;
}

function genHTML() {
  const store = getStore();
  listTodo.innerHTML = store.map(renderItem).join("");
}

// Add Task
function handleEvent() {
  const name = input.value.trim();
  if (!name) return;

  let store = getStore();

  let id;
  do id = randomId();
  while (store.some(e => e.id === id));

  const newTask = { id, name, isDone: false };

  store.push(newTask);
  setStore(store);

  listTodo.insertAdjacentHTML("beforeend", renderItem(newTask));
  input.value = "";
}

// Delete Task
function handleDeleteTask(id) {
  let store = getStore().filter(item => item.id !== id);
  setStore(store);

  const li = document.getElementById(id);
  if (li) li.remove();
}

// Change checkbox
function handleChangeChecked(id) {
  let store = getStore().map(item =>
    item.id === id ? { ...item, isDone: !item.isDone } : item
  );

  setStore(store);

  const li = document.getElementById(id);
  li.querySelector(".task").classList.toggle("done");
}

// Events
btnAdd.addEventListener("click", handleEvent);

listTodo.addEventListener("click", (e) => {
  if (e.target.closest("[data-delete]")) {
    const id = e.target.closest("li").id;
    handleDeleteTask(id);
  }
});

listTodo.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const id = e.target.closest("li").id;
    handleChangeChecked(id);
  }
});

document.addEventListener("DOMContentLoaded", genHTML);
