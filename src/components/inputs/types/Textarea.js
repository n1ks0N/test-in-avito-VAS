import React, { useRef } from 'react';

const Textarea = ({ text, type, value, name, placeholder, change, i }) => {
	const inputRef = useRef(value);
	const record = () => {
		change({
			param: inputRef.current.value,
			name: name,
			index: i
		});
	};
	return (
		<div>
			<label htmlFor={name + i}>{text}</label>
			<div className="input-group">
				<textarea
					type={type}
					className="form-control"
					id={name + i}
					placeholder={placeholder}
					ref={inputRef}
					value={value}
					onChange={record}
				/>
			</div>
		</div>
	);
};

export default Textarea;
