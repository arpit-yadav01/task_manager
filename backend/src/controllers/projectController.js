const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400);
      throw new Error("Project name is required");
    }

    const project = await Project.create({
      name,
      user: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// GET ALL PROJECTS
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// UPDATE PROJECT
const updateProject = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400);
      throw new Error("Project name is required");
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized");
    }

    project.name = name;

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

// DELETE PROJECT
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized");
    }

    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};