const express = require("express");
const taskRouter = express.Router();

const {validateTask} = require("../middlewares/validation.middleware")

const {createTask, getTask, getTaskById, updateTask, updateASingleField, deleteTask, filterTask, sortTask} = require("../controller/task.controller")


taskRouter
.post("/",validateTask, createTask)
.get("/", getTask)
.get("/filter", filterTask)
.get("/sort", sortTask)
.get("/:id", getTaskById)
.put("/:id", updateTask)
.patch("/:id", updateASingleField)
.delete("/:id", deleteTask)
module.exports = {taskRouter}