const Todo = require("../models/todo");

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.status(200).send({ todos });
};

const addTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// const getTodo = (req, res) => {
//   res.status(200).json(req.params.id);
// };

const editTodo = async (req, res) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findOneAndUpdate({ _id: todoID }, req.body, {
    new: true,
  });
  res.status(200).json({ todo });
};

const deleteTodo = async (req, res) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: todoID });
  res.status(200).send();
};

module.exports = {
  getAllTodos,
  addTodo,
  // getTodo,
  editTodo,
  deleteTodo,
};
