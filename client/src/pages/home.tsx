import Button from "../components/button";
import "../App.css";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

function Home() {
	const [users, setUser] = useState<
		{
			_id: string;
			name: string;
			email: string;
			createdOn: number;
		}[]
	>([]);

	const [isLogged, setIsLogged] = useState(true);

	const navigate = useNavigate();

	const fetchUser = async () => {
		try {
			const {data} = await axios.get(
				"http://localhost:3000/api/user/get-all-users"
			);
			setUser(data.users);
		} catch (error) {
			console.log(error);
		}
	};

	const checkLogged = () => {
		const token = JSON.parse(localStorage.getItem("token")!);
		setIsLogged(token ? true : false);
	};
	useEffect(() => {
		checkLogged();
		fetchUser();
	}, []);

	const deleteUser = async (id: string) => {
		try {
			const confirmation = confirm("Do you want to delete this user");

			const token = JSON.parse(localStorage.getItem("token")!);
			if (confirmation) {
				await axios.post("http://localhost:3000/api/user/delete-user", {
					id,
					token,
				});
				fetchUser();
				alert("User removed");
				return;
			}
		} catch (error) {
			const err = error as AxiosError<{message: string}>;
			if (err.response?.data.message === "token not found") {
				alert("User not authenticated");
				navigate("/login");
			}
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setIsLogged(false);
	};

	return (
		<div className="table-container">
			{isLogged && (
				<Button
					onclick={logout}
					styles={{
						background: "red",
						color: "white",
						margin: 0,
						marginBottom: "10px",
					}}>
					Logout
				</Button>
			)}
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users
						?.sort((a, b) => {
							return b.createdOn - a.createdOn;
						})
						?.map((user) => (
							<tr key={user._id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td className="btn-section">
									<Button
										onclick={() => navigate("/update/" + user._id)}
										styles={{
											background: "green",
											color: "white",
											margin: 0,
										}}>
										Update
									</Button>
									<Button
										onclick={() => deleteUser(user._id)}
										styles={{background: "red", color: "white", margin: 0}}>
										Delete
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<Button
				onclick={() => navigate("/create")}
				styles={{
					background: "blue",
					color: "white",
					margin: 0,
					marginTop: "10px",
				}}>
				Add User
			</Button>
		</div>
	);
}

export default Home;
