const Todo = require("../models/todo");

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.status(200).send({ todos });
};

const addTodo = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json({ todo });
};

const getTodo = (req, res) => {
  res.status(201).json(req.params.id);
};

const editTodo = (req, res) => {
  res.status(201).send("Edit Todo");
};

const deleteTodo = (req, res) => {
  res.status(201).send("Delete Todo");
};

module.exports = {
  getAllTodos,
  addTodo,
  getTodo,
  editTodo,
  deleteTodo,
};
