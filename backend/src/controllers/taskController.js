const Task = require("../models/Task");
const Project = require("../models/Project");

// CREATE TASK
const createTask = async (req, res, next) => {
  try {
    const { title, projectId } = req.body;

    if (!title || !projectId) {
      res.status(400);
      throw new Error("Title and projectId required");
    }

    const project = await Project.findById(projectId);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized");
    }

    const task = await Task.create({
      title,
      project: projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// GET TASKS
const getTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized");
    }

    const tasks = await Task.find({ project: projectId }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// UPDATE TASK
const updateTask = async (req, res, next) => {
  try {
    const { title, status } = req.body;

    const task = await Task.findById(req.params.id).populate("project");

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    if (task.project.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized");
    }

    if (status && !["Todo", "In Progress", "Done"].includes(status)) {
      res.status(400);
      throw new Error("Invalid status value");
    }

    if (title) task.title = title;
    if (status) task.status = status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// DELETE TASK
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate("project");

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    if (task.project.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized");
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};