import AuthModel from "../models/auth-model.js";
import {EmailValidation} from "../utils/email-validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
	try {
		const {email, password} = req.body;

		const user = await AuthModel.findOne({email});

		if (!user) {
			return res.status(404).json({message: "User not found"});
		}

		bcrypt.compare(password, user.password, (err, data) => {
			if (data) {
				jwt.sign(
					{email: user.email, id: user._id},
					process.env.JWT_SECRET,
					(err, token) => {
						if (token) {
							return res
								.cookie("token", token, {
									maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
								})
								.status(200)
								.json({message: "Login succesfull", token, user});
						} else {
							console.log(err);
							return res
								.status(500)
								.json({message: "Something went wrong", err});
						}
					}
				);
			} else {
				return res.status(400).json({message: "Wrong password", err});
			}
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

const signup = async (req, res) => {
	try {
		const {name, email, password} = req.body;

		if (!EmailValidation(email)) {
			return res.status(400).json({message: "Invalid Email"});
		}

		const user = await AuthModel.findOne({email: email});
		if (user) {
			return res.status(409).json({message: "Email already exists"});
		}

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		const auth = await AuthModel.create({
			name: name,
			email: email,
			password: hash,
			role: "Admin",
		});

		return res
			.status(200)
			.json({message: "Account created for succesfully", user: auth});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export {login, signup};
