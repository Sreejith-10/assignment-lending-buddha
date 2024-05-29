import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = async (req, res, next) => {
	try {
		const {token} = req.body;

		if (!token) {
			return res.status(401).json({message: "token not found"});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (decoded) {
			next();
		} else {
			return res.status(401).json({message: "User is not authenticated"});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Something went wrong", error});
	}
};

export default authenticateUser;
