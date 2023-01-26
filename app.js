const express = require("express");
const app = express();
const todos = require("./routes/todos");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notFound");
require("dotenv").config();

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/todos", todos);
app.use(notFound);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`DB Connected & Server listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
