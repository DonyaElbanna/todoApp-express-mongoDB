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
  res.status(200).json(req.params.id);
};

const editTodo = (req, res) => {
  res.status(200).send("Edit Todo");
};

const deleteTodo = async (req, res) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: todoID })
  res.status(200).send();
};

module.exports = {
  getAllTodos,
  addTodo,
  getTodo,
  editTodo,
  deleteTodo,
};
