import React, { useState, useEffect } from 'react';
import ButtonExport from './types/ButtonExport';
import html2canvas from 'html2canvas';
import gifshot from 'gifshot';
import './Buttons.css';
import { fbStorage } from '../../constants/config';

const Buttons = ({ notice, banner, banner: { width, height, time } }) => {
	const storageRef = fbStorage.storage().ref();
	const [src, setSrc] = useState('');
	const [images, setImages] = useState([]);
	const [dare, setDare] = useState('');
	useEffect(() => {
		if (images.length === 3) {
			// canvas --> gif
			gifshot.createGIF(
				{
					images: images,
					interval: time,
					gifWidth: width,
					gifHeight: height
				},
				function (obj) {
					if (!obj.error) {
						const gif = obj.image;

						// генерация имени файла
						let imageName = '';
						const alphabet = 'abcdefghijklmnopqrstuvwxyz';
						for (let j = 0; j < 16; j++) {
							imageName += alphabet.charAt(
								Math.floor(Math.random() * alphabet.length)
							);
						}

						// отправка файла на сервер
						const fileRef = storageRef.child(imageName);
						fileRef.putString(gif, 'data_url').then(() => {
							fetch(
								`https://api.imgbb.com/1/upload?key=9bfbbf5c0172756995a9ebc1990fa389&image=https://firebasestorage.googleapis.com/v0/b/banner-redactor.appspot.com/o/${imageName}?alt=media`
							)
								.then((response) => response.json())
								.then(({ data }) => {
									setSrc(data.url);
									setImages(() => []);
									dare === 'html'
										? navigator.clipboard.writeText(
												`<img src="https://firebasestorage.googleapis.com/v0/b/banner-redactor.appspot.com/o/${imageName}?alt=media" alt="banner">`
										  )
										: navigator.clipboard.writeText(data.url);
									notice('Скопировано');
								});
						});
					}
				}
			);
		} // eslint-disable-next-line
	}, [images]);
	const exportGIF = (type) => {
		setDare(() => type);
		const y = window.scrollY;
		const elemText = document.querySelectorAll('.banner__text');
		const elemWrapper = document.querySelectorAll('.banner__wrapper');
		for (let i = 0; i < banner.properties.length; i++) {
			// исправления бага html2canvas
			window.scrollTo(0, 0);
			const bgPositionX = Number.parseInt(
				elemWrapper[i].style.backgroundPositionX
			);
			elemText[i].style.marginRight = '15px';
			elemWrapper[i].style.backgroundPositionX = `${-5 + bgPositionX}px`;

			// html --> canvas
			html2canvas(document.querySelectorAll('.banner')[i], {
				logging: false
			}).then((canvas) => {
				const img = canvas.toDataURL();
				setImages((prev) => [...prev, img]); // сбор изображений; после достижения трёх - создание gif из useEffect
			});
			elemText[i].style.marginRight = '0px';
			elemWrapper[i].style.backgroundPositionX = `${bgPositionX}px`;
		}
		window.scrollTo(0, y);
	};
	const onFocus = (e) => {
		e.persist();
		e.target.select();
		navigator.clipboard.writeText(src);
	};
	return (
		<div className="panel__buttons">
			<div>
				<label htmlFor="result">Скопируйте и сохраните!</label>
				<br />
				<input
					type="text"
					className="form-control"
					value={src}
					onFocus={onFocus}
					readOnly
					id="result"
				/>
			</div>
			<ButtonExport text="Создать GIF" click={() => exportGIF('')} />
			<ButtonExport
				text="Скопировать как HTML"
				click={() => exportGIF('html')}
			/>
		</div>
	);
};

export default Buttons;
