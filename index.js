const express = require("express");
const { connection } = require("./db");
const taskRouter = require("./routes/task.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
});

// API routes
app.use("/tasks", taskRouter);

// Centralized error handler (must be after routes)
app.use(errorHandler);

app.listen(3030, async () => {
    try {
        await connection;
        console.log("DB is connected to server");
    } catch (err) {
        console.log("error in db connection", err.message);
    }
    console.log("server is running at 3030");
});