import React, { useEffect, useState } from 'react';

const Result = ({ banner: { width, height, properties, time, count } }) => {
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		setCounter(0);
	}, [count]);
	useEffect(() => {
		let timerId = setTimeout(
			() =>
				counter < count - 1 ? setCounter((prev) => ++prev) : setCounter(0),
			`${Number(time) > 0 ? time : 3}000`
		);
		return () => {
			clearTimeout(timerId);
		};
	}, [counter, time, count]);
	const styles = properties.map((data) => ({
		width: `${width}px`,
		height: `${height}px`,
		backgroundColor: `${data.bgColor}`,
		color: `${data.color}`,
		fontWeight: `${data.bold ? 'bold' : 'normal'}`,
		fontStyle: `${data.italic ? 'italic' : 'normal'}`,
		fontSize: `${data.size}px`,
		fontFamily: `${data.font[0]}`,
		wrapper: {
			backgroundImage: `url('${data.image}')`,
			backgroundPosition: `${data.left}px ${data.top}px`,
			backgroundSize: `${data.imgSize}%`
		}
	}));
	return (
		<div className="banner__wrapper">
			<h3>Результат</h3>
			<div className="banner" style={styles[counter >= count ? 0 : counter]}>
				<div
					className="banner__wrapper"
					style={styles[counter >= count ? 0 : counter].wrapper}
				>
					<p className="banner__text">
						{properties[counter >= count ? 0 : counter].text}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Result;
