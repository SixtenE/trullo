import { Router } from "express";
import {
  createUser,
  deleteUserById,
  updateUserById,
} from "../controllers/userController";

const router: Router = Router();

router.post("/users", createUser);

router.put("/users/:id", updateUserById);

router.delete("/users/:id", deleteUserById);

export default router;
