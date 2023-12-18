"use strict";
const _express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = _express.Router();
const url = "mongodb://localhost:27017"; // Default MongoDB connection string
const dbName = "stt"; // Replace with your database name
const client = new MongoClient(url);
let db;
// Connect to MongoDB
client
  .connect()
  .then(() => {
    console.log("Connected successfully to MongoDB");
    db = client.db(dbName);
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));
// Helper function to get the tasks collection
const getTasksCollection = () => db.collection("tasks");
// Route to retrieve a list of tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await getTasksCollection().find({}).toArray();
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Error fetching tasks", error: e });
  }
});
// Route to create a new task
router.post("/tasks", async (req, res) => {
  try {
    const task = req.body;
    const result = await getTasksCollection().insertOne(task);
    res.status(201).json(result.ops[0]);
  } catch (e) {
    res.status(500).json({ message: "Error creating task", error: e });
  }
});
// Route to retrieve a task by its ID
router.get("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await getTasksCollection().findOne({ _id: ObjectId(taskId) });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (e) {
    res.status(500).json({ message: "Error fetching task", error: e });
  }
});
// Route to update an existing task
router.put("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updateData = req.body;
    const result = await getTasksCollection().updateOne(
      { _id: ObjectId(taskId) },
      { $set: updateData },
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task updated" });
  } catch (e) {
    res.status(500).json({ message: "Error updating task", error: e });
  }
});
// Route to delete a task
router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const result = await getTasksCollection().deleteOne({
      _id: ObjectId(taskId),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ message: "Error deleting task", error: e });
  }
});
// Route to authenticate a user
// Implement as required. Placeholder for now.
router.post("/authenticate", (req, res) => {
  res.status(501).json({ message: "Authentication not implemented yet" });
});
module.exports = router;
