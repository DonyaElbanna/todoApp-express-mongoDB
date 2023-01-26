const todoInput = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");
const todosList = document.getElementById("todos-list");
// const deleteBtn = document.querySelectorA(".delete");

// Getting all todos
const getTodos = async () => {
  try {
    const {
      data: { todos },
    } = await axios.get("/api/todos");
    console.log(todos);
    const allTodos = todos.map((todoItem) => {
      const { completed, _id: todoID, todo } = todoItem;
      return `<div class="form-check">
      <div>
      <input class="form-check-input me-2" type="checkbox" id=${todoID} 
      ${completed ? "checked" : ""}>
      <label class="form-check-label" for=${todoID}>
        ${todo}
      </label>
      </div>
      <div>
      
      <button class="edit">
      <a href="edit-todo.html?id=${todoID}">
      <span class="material-symbols-outlined icon edit">
      edit
    </span>
    </a>
      </button>
      
      <button class="delete" data-id="${todoID}">
        <span class="material-symbols-outlined icon">
          delete
        </span>
      </button>
      </div>
    </div>`;
    });
    todosList.innerHTML = allTodos.join("");
  } catch (error) {
    console.log(error);
  }
};

getTodos();

// Adding new todo
const addTodo = async () => {
  const todo = todoInput.value;
  try {
    await axios.post("/api/todos", { todo });
    getTodos();
    todoInput.value = "";
  } catch (error) {
    console.log(error);
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

// Deleting todo
const deleteToggleTodo = async (e) => {
  let deleteID = e.target.parentElement.dataset.id;
  if (e.target.parentElement.classList.contains("delete")) {
    try {
      await axios.delete(`/api/todos/${deleteID}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  } else if (e.target.classList.contains("form-check-input")) {
    let editID = e.target.id;
    try {
      const todoCompleted = document.getElementById(editID).checked;
      await axios.patch(`/api/todos/${editID}`, { completed: todoCompleted });
      // console.log(e.target, todoCompleted);
    } catch (error) {
      console.log(error);
    }
  }
};
todosList.addEventListener("click", deleteToggleTodo);
