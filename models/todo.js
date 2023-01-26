const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  //   name: String,
  //   completed: Boolean, adding validators
  todo: {
    type: String,
    required: [true, "must provide a todo"],
    trim: true,
    maxlength: [30, "task can not be more than 30 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
