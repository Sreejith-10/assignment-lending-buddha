import {useState} from "react";
import "../App.css";
import axios, {AxiosError} from "axios";
import Input from "../components/input";
import Button from "../components/button";
import {useNavigate} from "react-router-dom";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const {data} = await axios.post(
				"http://localhost:3000/api/auth/signup",
				{name, email, password},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			navigate("/login");
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
					New user <br />
					<span>sign up to continue</span>
				</div>
				<Input
					value={name}
					onchange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
					name="name"
				/>
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
				<a href="/login">Already have an account?</a>

				<Button type="submit">Sign in</Button>
			</form>
		</div>
	);
}

export default Register;
