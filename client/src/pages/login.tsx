import {useState} from "react";
import "../App.css";
import axios, {AxiosError} from "axios";
import Input from "../components/input";
import Button from "../components/button";
import {useNavigate} from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPass, setShowPass] = useState(false);

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
				<div className="field-container">
					<Input
						value={password}
						onchange={(e) => setPassword(e.target.value)}
						type={showPass ? "text" : "password"}
						placeholder="Password"
						name="password"
					/>
					<div className="eye-icon">
						{showPass ? (
							<svg
								onClick={() => setShowPass(false)}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24">
								<path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
							</svg>
						) : (
							<svg
								onClick={() => setShowPass(true)}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24">
								<path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z" />
							</svg>
						)}
					</div>
				</div>
				<a href="/register">Create a new account?</a>
				<Button type="submit">Login</Button>
			</form>
		</div>
	);
}

export default Login;
