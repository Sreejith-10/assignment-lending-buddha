import {CSSProperties} from "react";
import "../App.css";

interface ButtonProps {
	children: string;
	type?: "button" | "submit" | "reset";
	styles?: CSSProperties;
	onclick?: () => void;
}

function Button({children, type = "button", styles, onclick}: ButtonProps) {
	return (
		<button
			onClick={onclick}
			style={styles}
			className="button-confirm"
			type={type}>
			{children}
		</button>
	);
}

export default Button;
