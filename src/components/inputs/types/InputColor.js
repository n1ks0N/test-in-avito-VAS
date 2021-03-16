import React from 'react';

const InputColor = ({ text, name, change, i }) => {
	const buttons = ['black', 'red', 'green', 'blue', 'yellow', 'aqua', 'white'];
	const record = (value) => {
		change({
			param: value,
			name: name,
			index: i
		});
	};
	return (
		<div className="panel__group__input-color">
			<label>{`${text}:`}&nbsp;</label>
			{buttons.map((data, i) => (
				<button
					className="btn__color"
					style={{ border: `5px solid ${data}` }}
					key={i}
					id={data}
					onClick={(e) => record(e.target.id)}
				>
					&nbsp;
				</button>
			))}
		</div>
	);
};

export default InputColor;
