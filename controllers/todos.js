const Todo = require("../models/todo");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    const unfinishedTodos = await Todo.find({ completed: false });
    res.status(200).json({ todos, unfinishedTodos: unfinishedTodos.length });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const addTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const editTodo = async (req, res) => {
  const { id: todoID } = req.params;
  // console.log(req.body)
  try {
    const todo = await Todo.findOneAndUpdate({ _id: todoID }, req.body, {
      new: true,
    });
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTodo = async (req, res) => {
  const { id: todoID } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: todoID });
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTodos,
  addTodo,
  editTodo,
  deleteTodo,
};
