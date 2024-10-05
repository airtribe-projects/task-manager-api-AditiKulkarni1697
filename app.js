const express = require('express');
const app = express();
const port = 3000;
const {connection} = require("./databases/mongodb.database")
const {taskRouter} = require("./routes/task.routes")
const {INTERNALSERVERERROR} = require("./middlewares/errorhandling.middleware")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tasks",taskRouter)
app.use(INTERNALSERVERERROR)

app.listen(port, async(err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    try{
      await connection;
      console.log(`Database is connectd to server`);
    }catch(err){
      console.log("error connecting database",err.message)
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;