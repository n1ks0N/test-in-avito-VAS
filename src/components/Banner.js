import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = ({
	banner: { width, height, bg, color, text, image, bold, italic, size, font }
}) => {
	// const [img, setImg] = useState(image[0])
	// useEffect(() => {
	// 	if (image.length > 1) {
	// 		setInterval(() => {
	// 			setImg(image[image.indexOf(img) !== image.length - 1 ? image.indexOf(img) + 1 : 0])
	// 		}, 1000)
	// 	}
	// }, [image, img])
	const style = {
		width: `${width}px`,
		height: `${height}px`,
		background: `${bg.style}`,
		color: `${color.style}`,
		fontWeight: `${bold ? 'bold' : 'normal'}`,
		fontStyle: `${italic ? 'italic' : 'normal'}`,
		fontSize: `${size}px`,
		fontFamily: `${font[0]}`,
		wrapper: {
			backgroundImage: `url('${image[0]}')`
		}
	};
	return (
		<div>
			<h3>Результат</h3>
			<div className="banner" style={style}>
				<div className="banner__wrapper" style={style.wrapper}>
					<p className="banner__text">{text}</p>
				</div>
			</div>
		</div>
	);
};

export default Banner;
