import React, { useEffect, useState } from 'react';

const Result = ({ banner: { width, height, properties, time } }) => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		let timerId = setTimeout(
			() => (count < 2 ? setCount((prev) => ++prev) : setCount(0)),
			`${Number(time) > 0 ? time : 3}000`
		);
		return () => {
			clearTimeout(timerId);
		};
	}, [count, time]);
	const styles = properties.map((data) => ({
		width: `${width}px`,
		height: `${height}px`,
		backgroundColor: `#ffffff`,
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
			<div className="banner" style={styles[count]}>
				<div className="banner__wrapper" style={styles[count].wrapper}>
					<p className="banner__text">{properties[count].text}</p>
				</div>
			</div>
		</div>
	);
};

export default Result;
