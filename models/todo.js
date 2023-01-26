const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  //   name: String,
  //   completed: Boolean, adding validators
  todo: {
    type: String,
    required: [true, "must provide a todo"],
    trim: true,
    maxlength: [20, "task can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
