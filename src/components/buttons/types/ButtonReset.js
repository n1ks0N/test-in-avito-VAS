import React from 'react';
import resetImage from '../../../assets/reset.png';
import './ButtonReset.css';

const ButtonReset = ({ click }) => {
	return (
		<button
			type="button"
			className="btn btn-outline-light panel__buttons__btn-reset"
			title="Сбросить изменения"
			onClick={click}
		>
			<img
				src={resetImage}
				className="panel__buttons__image_size"
				alt="reset"
			/>
		</button>
	); // to SVG
};

export default ButtonReset;
