// ==========================================
// 1. STATE & MOCK SERVER
// ==========================================
let todos = [];
let nextId = 1;

/**
 * სერვერის იმიტაცია — 20%-იანი ჩავარდნის ალბათობით
 */
function saveTodoToServer(todo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error("ქსელის შეცდომა — ვერ შეინახა"));
      } else {
        resolve({ ...todo, savedAt: Date.now() });
      }
    }, 800);
  });
}

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const statusEl = document.querySelector("#todo-status");
const todoList = document.querySelector("#todo-list");
const syncBtn = document.querySelector("#sync-btn");

// ==========================================
// 3. UI RENDER FUNCTIONS
// ==========================================
function setStatus(message, state = "idle") {
  statusEl.textContent = message;
  statusEl.setAttribute("data-state", state);
}

function createTodoElement(todo) {
  const { id, text, completed } = todo;
  const li = document.createElement("li");
  li.dataset.id = id;
  if (completed) li.classList.add("completed");

  li.insertAdjacentHTML(
    "beforeend",
    `
    <input type="checkbox" ${completed ? "checked" : ""}>
    <span>${escapeHTML(text)}</span>
    <button class="delete-btn" aria-label="წაშლა">✕</button>
  `
  );
  return li;
}

function renderTodos() {
  const fragment = document.createDocumentFragment();

  for (const todo of todos) {
    fragment.appendChild(createTodoElement(todo));
  }

  todoList.innerHTML = "";
  todoList.appendChild(fragment);
}

// XSS შეტევისგან დასაცავად
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// ==========================================
// 4. EVENT HANDLERS & ASYNC LOGIC
// ==========================================

// --- დავალების დამატება (Optimistic UI + Rollback) ---
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const newTodo = { id: nextId++, text, completed: false };

  // 1. Optimistic Update — ჯერ ვამატებთ State-ში და ვარენდერებთ
  todos.push(newTodo);
  renderTodos();
  input.value = "";
  setStatus(" ინახება სერვერზე...", "pending");

  try {
    // 2. სერვერზე გაგზავნა
    await saveTodoToServer(newTodo);
    setStatus(" წარმატებით შეინახა", "success");
  } catch (error) {
    // 3. Rollback შეცდომის შემთხვევაში — ამოვიღებთ დავალებას state-იდან
    todos = todos.filter((t) => t.id !== newTodo.id);
    renderTodos();
    setStatus(` ${error.message}`, "error");
  }
});

// --- Event Delegation (წაშლა და Checkbox) ---
todoList.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (event.target.matches(".delete-btn")) {
    todos = todos.filter((t) => t.id !== id);
    renderTodos();
  } else if (event.target.matches("input[type='checkbox']")) {
    todos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    renderTodos();
  }
});

// --- Promise.allSettled: მასობრივი სინქრონიზაცია ---
syncBtn.addEventListener("click", async () => {
  if (todos.length === 0) {
    setStatus("სინქრონიზაციისთვის დავალებები არ არის", "idle");
    return;
  }

  setStatus(`⏳ ${todos.length} დავალების სინქრონიზაცია...`, "pending");

  const results = await Promise.allSettled(
    todos.map((todo) => saveTodoToServer(todo))
  );

  const failed = results.filter((r) => r.status === "rejected").length;

  if (failed === 0) {
    setStatus("ყველა დავალება სინქრონიზებულია", "success");
  } else {
    setStatus(`${failed} დავალება ვერ სინქრონიზდა`, "error");
  }
});