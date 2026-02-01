const { TaskModel } = require("../models/task.model");

// Example controller demonstrating async errors forwarded to middleware
const allTasks = async (req, res) => {
    const {completed, createdAt="1"} = req.query;
    const query = {}

    if(completed !== undefined){
        query.completed = completed === "true"
    }

    const sortOrder = parseInt(createdAt) || 1;
	// Replace with real DB/service call as needed
    const tasks = await TaskModel.find(query).sort({createdAt: sortOrder});
	res.status(200).json({ success: true, data: tasks });
};

const taskById = async(req,res) => {
    const {id} = req.params;

    const getTaskById = await TaskModel.findById(id)

    if(!getTaskById){
        const err = new Error(`Task with id ${id} is not present`);
        err.statusCode = 404;
        throw err;

    }
    res.status(200).json({success:true, data:getTaskById})
}

const taskByPriority = async(req,res) => {
    const {level} = req.params;

    

    const tasks = await TaskModel.find({priority:level})

    res.status(200).json({success:true, data: tasks})
}

const task = async (req,res) => {
    const {title, description} = req.body;

    const createTask = new TaskModel({title, description, priority: "medium", completed:false})
    await createTask.save()
    res.status(201).json({success:true, data: createTask})
}



const updateTask = async(req,res) => {
    const {id} = req.params;
    const {title, description, priority, completed} = req.body;

    const isPresent = await TaskModel.findById(id);

    if(!isPresent){
        const err = new Error(`Task with id ${id} not found`);
        err.statusCode = 404;
        throw err;
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { title, description, priority, completed },
        { new: true }
    );

    res.status(200).json({ success: true, data: updatedTask });
}

const deleteTask = async(req,res) => {
    const {id} = req.params;

    const isPresent = await TaskModel.findById(id);

    if(!isPresent){
        const err = new Error(`The task with id ${id} is not present`)
        err.statusCode = 404
        throw err;
    }

    await TaskModel.findByIdAndDelete(id)
    res.status(200).json({ success: true });
}

module.exports = { allTasks, taskById, taskByPriority, task, updateTask, deleteTask};