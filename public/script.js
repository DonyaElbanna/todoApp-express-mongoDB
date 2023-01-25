// const axios = require("axios");

const todoInput = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");
const todosList = document.getElementById("todos-list");

const getTodos = async () => {
  try {
    const {
      data: { todos },
    } = await axios.get("/api/todos");
    console.log(todos);
    const allTodos = todos.map((todo) => {
      const { completed, _id: todoID, name } = todo;
      return `<div class="form-check">
      <input class="form-check-input" type="checkbox" id=${todoID} ${
        completed ? "checked" : null
      }>
      <label class="form-check-label" for=${todoID}>
        ${name}
      </label>
    </div>`;
    });
    todosList.innerHTML = allTodos.join("");
  } catch (error) {
    console.log(error);
  }
};

getTodos();

const addTodo = async () => {
  const name = todoInput.value;
  // console.log(todo)
  try {
    await axios.post("/api/todos", { name });
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
