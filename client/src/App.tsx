import {Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Form from "./pages/form";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route index element={<Home />} />
				<Route path="/create" element={<Form />} />
				<Route path="/update/:id" element={<Form />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
