const Todo = require("../models/todo");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllTodos = asyncWrapper(async (req, res) => {
  const todos = await Todo.find({});
  const unfinishedTodos = await Todo.find({ completed: false });
  res.status(200).json({ todos, unfinishedTodos: unfinishedTodos.length });
});

const addTodo = asyncWrapper(async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json({ todo });
});

const editTodo = asyncWrapper(async (req, res) => {
  const { id: todoID } = req.params;
  // console.log(req.body)
  const todo = await Todo.findOneAndUpdate({ _id: todoID }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ todo });
});

const deleteTodo = asyncWrapper(async (req, res) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: todoID });
  res.status(200).send("success: todo deleted");
});

module.exports = {
  getAllTodos,
  addTodo,
  editTodo,
  deleteTodo,
};
