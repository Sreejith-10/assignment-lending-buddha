import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Number,
		default: Date.now(),
	},
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
