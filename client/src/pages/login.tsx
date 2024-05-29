import {useState} from "react";
import "../App.css";
import axios, {AxiosError} from "axios";
import Input from "../components/input";
import Button from "../components/button";
import {useNavigate} from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const {data} = await axios.post(
				"http://localhost:3000/api/auth/login",
				{email, password},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			navigate("/");
			alert(data.message);
			localStorage.setItem("token", JSON.stringify(data.token));
		} catch (error) {
			const err = error as AxiosError<{message: string}>;
			alert(err.response?.data.message);
		}
	};

	return (
		<div className="container">
			<form className="form" onSubmit={submitHandler}>
				<div className="title">
					Login to your account <br />
				</div>
				<Input
					value={email}
					onchange={(e) => setEmail(e.target.value)}
					name="email"
					placeholder="Email"
					type="email"
				/>
				<Input
					value={password}
					onchange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
					name="password"
				/>
				<a href="/register">Create a new account?</a>
				<Button type="submit">Login</Button>
			</form>
		</div>
	);
}

export default Login;
