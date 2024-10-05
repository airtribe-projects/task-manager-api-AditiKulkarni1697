const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name: {type:String, unique: true, required:true},
    due_date: {type:Date, required: true},
    priority: {type:String, enum: ["high", "medium", "low"]},
    status: {type:String, enum: ["pending", "in-progess", "completed"], default:"pending"},
    role: {type:String, default: "User"}

})

const TaskModel = mongoose.model("tasks", taskSchema)

module.exports = {TaskModel}