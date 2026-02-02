const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: String,
  description: String,
  priority: {type:String, enum: ["low", "medium", "high"], default: "medium"},
  completed: Boolean
},{timestamps:true});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {TaskModel};