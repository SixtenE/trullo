import { Router } from "express";

import {
  getProjectById,
  getUserProjects,
  reorderTasks,
  updateProject,
} from "../controllers/projectController.js";

const router: Router = Router();

router.get("/projects", getUserProjects);
router.get("/projects/:id", getProjectById);

router.put("/projects/:id", updateProject);
router.put("/projects/:id/reorder", reorderTasks);

// router.post("/projects", createProject);
// router.post("/projects/:id/tasks", addTaskToProject);
// router.post("/projects/:id/members", addMemberToProject);

// router.delete("/projects/:id", deleteProjectById);

export default router;
