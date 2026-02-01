
const express = require("express");
const { allTasks, task, taskById, taskByPriority,  updateTask, deleteTask} = require("../controller/task.controller");
const catchAsync = require("../middleware/catchAsync");
const { inputValidation } = require("../middleware/inputValidation.middleware");

const taskRouter = express.Router();

// Wrap async handlers with catchAsync so thrown/rejected errors go to next(err)
taskRouter.get("/", catchAsync(allTasks))

taskRouter.get("/:id", catchAsync(taskById))

taskRouter.get("/priority/:level", catchAsync(taskByPriority))

taskRouter.post("/",inputValidation, catchAsync(task))

taskRouter.put("/:id",inputValidation, catchAsync(updateTask))

taskRouter.delete("/:id", catchAsync(deleteTask))

module.exports = taskRouter;