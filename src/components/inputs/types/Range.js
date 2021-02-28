import React, { useRef } from 'react';

const Range = ({ text, max, min, value, name, change, i }) => {
  const inputRef = useRef(value)
	const record = () => {
		change({
			param: inputRef.current.value,
			name: name,
      index: i
		});
	};
	return (
		<div className="range">
		  <label htmlFor={name}>{text}</label>
      <input type="range" className="custom-range" min={min} max={max} id={name} value={value} ref={inputRef} onChange={record} />
		</div>
	);
};

export default Range;
