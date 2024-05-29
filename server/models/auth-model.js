import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Number,
		default: Date.now(),
	},
});

const AuthModel = mongoose.model("auth", authSchema);

export default AuthModel;
