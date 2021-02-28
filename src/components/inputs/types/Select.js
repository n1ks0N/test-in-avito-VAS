import React, { useRef } from 'react';

const Select = ({ text, name, value, change, className, i }) => {
	const inputRef = useRef(value);
	const record = () => {
		change({
			param: inputRef.current.value,
			index: i
		});
	};
	return (
		<div>
			<label htmlFor={name + i}>{text}</label>
			<select
				className={`custom-select ${className}`}
				id={name + i}
				ref={inputRef}
				value={value[0]}
				onChange={record}
			>
				{value.map((data) => (
					<option value={data} key={data}>
						{data}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
