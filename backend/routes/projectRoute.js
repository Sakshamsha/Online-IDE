const express = require("express");
const { createProject, getProject, getProjects, deleteProject, updateProject } = require("../controllers/project");
const router = express.Router();

router.post("/createProject",createProject);
router.post("/getProject",getProject);
router.post("/getProjects",getProjects);
router.post("/deleteProject",deleteProject);
router.post("/updateProject",updateProject);

module.exports = router;