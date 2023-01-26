const todoInput = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");
const todosList = document.getElementById("todos-list");
const msg = document.getElementById("msg");
const unfinishedTodosDiv = document.getElementById("unfinished-todos");

// Getting all todos
const getTodos = async () => {
  try {
    const {
      data: { todos, unfinishedTodos },
    } = await axios.get("/api/todos");
    // console.log(todos, unfinishedTodos);
    const allTodos = todos.map((todoItem) => {
      const { completed, _id: todoID, todo } = todoItem;
      return `<div class="form-check">
      <div>
      <input class="form-check-input me-2" type="checkbox" id=${todoID} 
      ${completed ? "checked" : ""}>
      <label class="form-check-label" for=${todoID}  ${
        completed && "style=text-decoration:line-through"
      }>
        ${todo}
      </label>
      </div>
      <div>
      <button class="delete" data-id="${todoID}">
        <span class="material-symbols-outlined icon">
          delete
        </span>
      </button>
      </div>
    </div>`;
    });
    todosList.innerHTML = allTodos.join("");

    if (unfinishedTodos === 0) {
      unfinishedTodosDiv.innerHTML = "Nothing left to do!";
    } else {
      unfinishedTodosDiv.innerHTML = `Todos left: ${unfinishedTodos}`;
    }
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
    msg.style.visibility = "visible";
    msg.classList.add("card", "border-success", "text-success");
    msg.textContent = "Todo Added";
  } catch (error) {
    msg.style.visibility = "visible";
    msg.classList.add("card", "border-danger", "text-danger");
    if (todoInput.value.length === 0) {
      msg.textContent = "Error: todo cannot be empty";
    } else if (todoInput.value.length > 20) {
      msg.textContent = "Error: todo cannot exceed 20 charaters";
    } else {
      msg.textContent = "An error occured, plaese try again";
    }
    todoInput.value = "";
  }
  setTimeout(() => {
    msg.style.visibility = "hidden";
    msg.removeAttribute("class");
  }, 3000);
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

// Deleting & toggling todo
const deleteToggleTodo = async (e) => {
  let deleteID = e.target.parentElement.dataset.id;
  // delete todo
  if (e.target.parentElement.classList.contains("delete")) {
    try {
      await axios.delete(`/api/todos/${deleteID}`);
      getTodos();
      msg.style.visibility = "visible";
      msg.classList.add("card", "border-success", "text-success");
      msg.textContent = "Todo Deleted";
      setTimeout(() => {
        msg.style.visibility = "hidden";
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    // toggle todo
  } else if (e.target.classList.contains("form-check-input")) {
    let editID = e.target.id;
    try {
      const todoCompleted = document.getElementById(editID).checked;
      await axios.patch(`/api/todos/${editID}`, { completed: todoCompleted });
      getTodos();
      // unfinishedTodosDiv.innerHTML = `Todos Left: ${todoCompleted}`;
      // console.log(e.target, todoCompleted);
    } catch (error) {
      console.log(error);
    }
  }
};
todosList.addEventListener("click", deleteToggleTodo);
