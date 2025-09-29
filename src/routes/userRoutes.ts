import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userController";

const router: Router = Router();

router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.put("/users/:id", updateUserById);

router.delete("/users/:id", deleteUserById);

export default router;
