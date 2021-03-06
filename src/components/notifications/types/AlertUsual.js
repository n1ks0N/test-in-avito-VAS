import React from 'react';
import './AlertUsual.css';

const AlertExport = ({ text, style }) => {
	return (
		<div
			className="alert alert-secondary main__alert"
			style={style}
			role="alert"
		>
			{text}
		</div>
	);
};

export default AlertExport;
