
const express = require("express");

const taskRouter = express.Router();

const {TaskModel} = require("../models/task.model")

const {validateTask} = require("../middlewares/validation.middleware")

const {CREATEOBJECTRESPONSE, GETDATARESPONSE, UPDATERESPONSE, NOTFOUNDEXCEPTION, OBJECTDELETEDSUCCESS} = require("../helpers/sendResponse")

async function createTask (req,res,next){
   try{
    const {name,
    due_date,
    priority} = req.body

    const response = new TaskModel({name, due_date, priority})
    await response.save()

    CREATEOBJECTRESPONSE(res, response)
   
   }catch(err){
     next(err)
   }
}

async function getTask(req,res,next){
  try{
      const response = await TaskModel.find()
      GETDATARESPONSE(res, response)
  }
  catch(err){
    next(err)
  }
}

async function getTaskById(req,res,next){
  try{
      const taskId = req.params.id;
      const response = await TaskModel.find({_id:taskId})

      if(!response){
        NOTFOUNDEXCEPTION(res,null);
        return;
      }

      GETDATARESPONSE(res, response)
  }
  catch(err){
    next(err)
  }
}

async function updateTask(req,res,next){
  const _id = req.params.id;
  const payload = req.body

  try{
  const TaskPresent = await TaskModel.findOne({_id:_id})

  if(!TaskPresent){
    NOTFOUNDEXCEPTION(res,null);
    return;
  }

  const UpdatedTaask = {
    name: payload.name || null,
    due_date: payload.due_date || null,
    priority: payload.priority || null,
    status: payload.status || null
  }

   const response = await TaskModel.findByIdAndUpdate(_id, UpdatedTaask, { new: true });
   UPDATERESPONSE(res,response)
  }catch(err){
    next(err)
  }
}

async function updateASingleField(req,res,next){
  const _id = req.params.id;
  const payload = req.body

  try{

    const TaskPresent = await TaskModel.findOne({_id:_id})

  if(!TaskPresent){
    NOTFOUNDEXCEPTION(res,null);
    return;
  }

   const response = await TaskModel.findByIdAndUpdate(_id, payload, { new: true });
   UPDATERESPONSE(res,response)
  }catch(err){
    next(err)
  }
}

async function deleteTask(req,res,next){
  const _id = req.params.id
  try{
  const TaskPresent = await TaskModel.findOne({_id:_id})

  if(!TaskPresent){
    NOTFOUNDEXCEPTION(res,null);
    return;
  }
  
  await TaskModel.findByIdAndDelete({_id:_id})

   OBJECTDELETEDSUCCESS(res)
}catch(err){
  next(err)
}
  }

async function filterTask(req,res,next){
  const filters = req.query 

  try{
   const Filteredtask = await TaskModel.find(filters)

   if(!Filteredtask){
    NOTFOUNDEXCEPTION(res,null);
    return;
   }
  
   GETDATARESPONSE(res, Filteredtask)

  }
  catch(err){
    next(err)
  }
}

async function sortTask(req,res,next){
  const {field, order="asc"} = req.query 

  try{
   
   const sortOrder = order==="desc"?-1:1;

   const sortedTask = await TaskModel.find().sort({[field]:sortOrder})

   if(!sortTask){
    NOTFOUNDEXCEPTION(res,null);
    return;
   }

  
   GETDATARESPONSE(res, sortedTask)

  }
  catch(err){
    next(err)
  }
}

module.exports = {createTask, getTask, getTaskById, updateTask, updateASingleField, deleteTask, filterTask, sortTask};
