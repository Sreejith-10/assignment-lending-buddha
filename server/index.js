import express from "express";
import dotenv from "dotenv";
import {userRouter} from "./routes/user-routes.js";
import database from "./db/connect.js";
import cors from "cors";
import {authRouter} from "./routes/auth-routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
	cors({
		origin: "*",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);

database;

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
