import { Router } from "express";
import { deleteUserById, updateUserById } from "../controllers/userController";

const router: Router = Router();

router.put("/users/:id", updateUserById);

router.delete("/users/:id", deleteUserById);

export default router;
