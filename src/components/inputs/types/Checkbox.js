import React from 'react';

const Checkbox = ({ text, name, value, change }) => {
	const record = () => {
		change({
			param: !value,
			name: name
		});
	};
	return (
		<div className="form-check form-check-inline">
			<input
				className="form-check-input"
				type="checkbox"
				id={name}
				checked={value}
				onChange={record}
			/>
			<label className="form-check-label" htmlFor={name}>
				{text}
			</label>
		</div>
	);
};

export default Checkbox;
