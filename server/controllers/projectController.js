const Project = require("../models/Project");
const { cloudinary } = require("../config/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

/**
 * GET /api/projects
 * Public — list all projects, featured first, then by order / createdAt.
 * Supports ?featured=true query param.
 */
const getProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.featured === "true") filter.featured = true;

  const projects = await Project.find(filter).sort({
    featured: -1,
    order: 1,
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully."));
});

/**
 * GET /api/projects/:id
 * Public — get a single project by ID.
 */
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found.");

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully."));
});

/**
 * POST /api/projects
 * Protected (admin) — create a new project.
 * Accepts an optional image file via multipart/form-data.
 */
const createProject = asyncHandler(async (req, res) => {
  const { title, description, techStack, liveUrl, githubUrl, featured, order } =
    req.body;

  // Parse techStack if sent as JSON string (multipart forms stringify arrays)
  const parsedStack =
    typeof techStack === "string" ? JSON.parse(techStack) : techStack;

  const image = req.file
    ? { url: req.file.path, publicId: req.file.filename }
    : { url: "", publicId: "" };

  const project = await Project.create({
    title,
    description,
    techStack: parsedStack,
    image,
    liveUrl,
    githubUrl,
    featured: featured === "true" || featured === true,
    order: Number(order) || 0,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully."));
});

/**
 * PUT /api/projects/:id
 * Protected (admin) — update an existing project.
 * If a new image is uploaded, the old Cloudinary asset is deleted.
 */
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found.");

  const { title, description, techStack, liveUrl, githubUrl, featured, order } =
    req.body;

  if (title !== undefined) project.title = title;
  if (description !== undefined) project.description = description;
  if (techStack !== undefined) {
    project.techStack =
      typeof techStack === "string" ? JSON.parse(techStack) : techStack;
  }
  if (liveUrl !== undefined) project.liveUrl = liveUrl;
  if (githubUrl !== undefined) project.githubUrl = githubUrl;
  if (featured !== undefined) project.featured = featured === "true" || featured === true;
  if (order !== undefined) project.order = Number(order);

  // Replace image: delete old asset from Cloudinary, store new one
  if (req.file) {
    if (project.image.publicId) {
      await cloudinary.uploader.destroy(project.image.publicId);
    }
    project.image = { url: req.file.path, publicId: req.file.filename };
  }

  const updated = await project.save();

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Project updated successfully."));
});

/**
 * DELETE /api/projects/:id
 * Protected (admin) — delete a project and its Cloudinary image asset.
 */
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found.");

  // Clean up Cloudinary asset
  if (project.image.publicId) {
    await cloudinary.uploader.destroy(project.image.publicId);
  }

  await project.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Project deleted successfully."));
});

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
