import {useEffect, useState} from "react";
import "../App.css";
import axios, {AxiosError} from "axios";
import Input from "../components/input";
import Button from "../components/button";
import {useNavigate, useParams} from "react-router-dom";

function Form() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [user, setUser] = useState<{name: string; email: string}>();

	const {id} = useParams();
	const navigate = useNavigate();

	const fetchUser = async () => {
		try {
			const {data} = await axios.get("http://localhost:3000/get-user/" + id);
			const resp = data.data;
			setUser(resp);
			setName(resp.name);
			setEmail(resp.email);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (id) {
			fetchUser();
		}
	}, [id]);

	const submitHandler = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			const token = JSON.parse(localStorage.getItem("token")!);
			await axios.post(
				"http://localhost:3000/api/user/create-user/",
				{name, email, token},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			navigate("/");
		} catch (error) {
			const err = error as AxiosError<{message: string}>;
			if (err.response?.data.message === "token not found") {
				alert("User not authenticated");
				navigate("/login");
			}
		}
	};

	const updateHandler = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			if (user?.name === name && user.email === email)
				return alert("no changes made");

			const token = JSON.parse(localStorage.getItem("token")!);
			await axios.put(
				"http://localhost:3000/api/user/update-user/",
				{id, name, email, token},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			navigate("/");
		} catch (error) {
			const err = error as AxiosError<{message: string}>;
			if (err.response?.data.message === "token not found") {
				alert("User not authenticated");
				navigate("/login");
			}
		}
	};

	return (
		<div className="container">
			<form className="form" onSubmit={id ? updateHandler : submitHandler}>
				<div className="title">
					Welcome <br />
					<span>sign up to continue</span>
				</div>
				<Input
					value={name}
					name="name"
					placeholder="User Name"
					type="text"
					onchange={(e) => setName(e.target.value)}
				/>
				<Input
					value={email}
					onchange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
					name="email"
				/>
				<Button type="submit">{id ? "Update" : "Submit"}</Button>
			</form>

			{name.length > 0 || email.length > 0 ? (
				<div className="display">
					{name.length > 0 && (
						<p>
							<b>Name</b> : {name}
						</p>
					)}
					{email.length > 0 && (
						<p>
							<b>Email</b> : {email}
						</p>
					)}
				</div>
			) : null}
		</div>
	);
}

export default Form;
