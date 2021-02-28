import React, { useRef } from 'react';

const InputFile = ({ text, name, accept, change, multiple, i }) => {
	const inputRef = useRef(null);
	const record = () => {
		change({
			param: inputRef.current.files[0],
			index: i
		});
	};
	return (
		<div className="custom-file">
			<input
				type="file"
				className="custom-file-input"
				id={name}
				accept={accept}
				ref={inputRef}
				onChange={record}
				multiple={multiple ? true : false}
			/>
			<label className="custom-file-label" htmlFor={name}>
				{text}
			</label>
		</div>
	);
};

export default InputFile;
