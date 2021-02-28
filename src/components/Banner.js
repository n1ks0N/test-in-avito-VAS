import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = ({
	banner: { width, height },
	properties: {
		color,
		text,
		image,
		bold,
		italic,
		size,
		font,
		left,
		top,
		imgSize
	}
}) => {
	const style = {
		width: `${width}px`,
		height: `${height}px`,
		backgroundColor: `#ffffff`,
		color: `${color}`,
		fontWeight: `${bold ? 'bold' : 'normal'}`,
		fontStyle: `${italic ? 'italic' : 'normal'}`,
		fontSize: `${size}px`,
		fontFamily: `${font[0]}`,
		wrapper: {
			backgroundImage: `url('${image}')`,
			backgroundPosition: `${left}px ${top}px`,
			backgroundSize: `${imgSize}%`
		}
	};
	return (
		<div>
			<div className="banner" style={style}>
				<div className="banner__wrapper" style={style.wrapper}>
					<p className="banner__text">{text}</p>
				</div>
			</div>
		</div>
	);
};

export default Banner;
