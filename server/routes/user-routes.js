import express from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	updateUser,
} from "../controllers/user-controller.js";
import authenticateUser from "../middlewares/authenticate-user.js";

const router = express.Router();

router.get("/get-all-users", getAllUsers);
router.get("/get-user/:id", getUser);
router.post("/create-user", authenticateUser, createUser);
router.post("/delete-user", authenticateUser, deleteUser);
router.put("/update-user", authenticateUser, updateUser);

export {router as userRouter};
