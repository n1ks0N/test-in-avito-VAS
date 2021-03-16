import React from 'react';

const Checkbox = ({ text, name, value, change, i }) => {
	const record = () => {
		change({
			param: !value,
			name: name,
			index: i
		});
	};
	return (
		<div className="form-check form-check-inline checkbox">
			<input
				className="form-check-input"
				type="checkbox"
				id={name + i}
				checked={value}
				onChange={record}
			/>
			<label className="form-check-label" htmlFor={name + i}>
				{text}
			</label>
		</div>
	);
};

export default Checkbox;
