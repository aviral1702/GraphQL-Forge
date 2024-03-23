const express = require("express");
const mongoose = require("./connection");
const UserRouter = require("./routers/userRouter");
const projectRouter = require("./routers/projectRouter");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());
app.use("/user", UserRouter);
app.use("/project", projectRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/add", (req, res) => {
  res.send("Add User");
});

app.get("/getall", (req, res) => {
  res.send("Get All Users");
});

app.get("/authenticate", (req, res) => {
  res.send("Authenticate User");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
