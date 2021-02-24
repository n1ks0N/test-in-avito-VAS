import React, { useRef } from 'react';

const InputFile = ({ text, name, accept, change }) => {
	const inputRef = useRef(null);
	const record = () => {
		change({
			param: inputRef.current.files[0]
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
			/>
			<label className="custom-file-label" htmlFor={name}>
				{text}
			</label>
		</div>
	);
};

export default InputFile;
