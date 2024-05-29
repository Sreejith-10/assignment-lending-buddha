import "../App.css";

interface InputProps {
	value?: string;
	type?: string;
	name?: string;
	placeholder?: string;
	onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({value, type, name, placeholder, onchange}: InputProps) {
	return (
		<input
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onchange ? (e) => onchange(e) : undefined}
			className="input"
			required
		/>
	);
}

export default Input;
