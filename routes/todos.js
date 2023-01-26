const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  addTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/todos");

router.route("/").get(getAllTodos).post(addTodo);
router.route("/:id").patch(editTodo).delete(deleteTodo);

module.exports = router;
