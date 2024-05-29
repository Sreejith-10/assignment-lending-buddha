import mongoose from "mongoose";
import UserModel from "../models/user-model.js";
import {EmailValidation} from "../utils/email-validation.js";

const createUser = async (req, res) => {
	try {
		const {name, email} = req.body;

		if (!EmailValidation(email)) {
			return res.status(400).json({message: "Invalid Email"});
		}

		const emailExist = await UserModel.findOne({email: email});

		if (emailExist) {
			return res.status(400).json({message: "Email already exist"});
		}

		const user = await UserModel.create({name, email});

		res.status(200).json({message: "User created", data: user});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Something went wrong", error});
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await UserModel.find();

		res.status(200).json({users});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Something went wrong", error});
	}
};

const getUser = async (req, res) => {
	try {
		const {id} = req.params;

		const user = await UserModel.findOne({_id: id});

		if (!user) {
			return res.status(400).json({message: "User does not exist"});
		}

		res.status(200).json({message: "User found", data: user});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Something went wrong", error});
	}
};

const updateUser = async (req, res) => {
	try {
		const {id, name, email} = req.body;

		const user = await UserModel.findOne({_id: id});

		const emailExist = await UserModel.findOne({email: email});

		if (emailExist) {
			if (emailExist._id === id) {
				update();
			} else {
				return res.status(400).json({message: "Email already exist"});
			}
		} else {
			update();
		}

		function update() {
			if (!EmailValidation(email)) {
				return res.status(400).json({message: "Invalid Email"});
			}

			user.name = name;
			user.email = email;
			user.save();

			res.status(200).json({message: "User updated", data: user});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Something went wrong", error});
	}
};

const deleteUser = async (req, res) => {
	try {
		const {id} = req.body;

		await UserModel.deleteOne({_id: id});
		res.status(202).json({message: "User deleted"});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Something went wrong", error});
	}
};

export {createUser, getAllUsers, getUser, updateUser, deleteUser};
