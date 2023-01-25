const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  addTodo,
  getTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/todos");

router.route("/").get(getAllTodos).post(addTodo);
router.route("/:id").get(getTodo).patch(editTodo).delete(deleteTodo);

module.exports = router;
