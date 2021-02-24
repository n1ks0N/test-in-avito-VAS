import React, { useRef } from 'react';

const InputText = ({ text, type, value, name, placeholder, change }) => {
	const inputRef = useRef(value);
	const record = () => {
		change({
			param: inputRef.current.value,
			name: name
		});
	};
	return (
		<div>
			<label htmlFor={name}>{text}</label>
			<div className="input-group">
				<input
					type={type}
					className="form-control"
					id={name}
					placeholder={placeholder}
					ref={inputRef}
					value={value}
					onChange={record}
				/>
			</div>
		</div>
	);
};

export default InputText;
