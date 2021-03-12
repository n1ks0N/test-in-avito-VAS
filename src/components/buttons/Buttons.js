import React, { useState } from 'react';
import ButtonExport from './types/ButtonExport';
import html2canvas from 'html2canvas';
import gifshot from 'gifshot';
import './Buttons.css';
import { fbStorage } from '../../constants/config';

const Buttons = ({ notice, banner: { width, height, time } }) => {
	const storageRef = fbStorage.storage().ref();
	const [src, setSrc] = useState('');
	const exportHTML = () => {
		const y = window.scrollY;
		let images = [];
		for (let i = 0; i < 3; i++) {
			window.scrollTo(0, 0); // эмуляция прокрутки окна к верху, для исправления бага html2canvas
			html2canvas(document.querySelectorAll('.banner')[i])
				.then((canvas) => {
					let image = canvas.toDataURL();
					images.push(image);
				})
				.then(() => {
					if (i === 2) {
						gifshot.createGIF(
							{
								images: images,
								interval: time,
								gifWidth: width,
								gifHeight: height
							},
							function (obj) {
								if (!obj.error) {
									const image = obj.image;

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
									fileRef.putString(image, 'data_url').then(() => {
										navigator.clipboard.writeText(
											`<img src="https://firebasestorage.googleapis.com/v0/b/banner-redactor.appspot.com/o/${imageName}?alt=media" alt="banner">`
										);
										setSrc(
											`https://firebasestorage.googleapis.com/v0/b/banner-redactor.appspot.com/o/${imageName}?alt=media`
										);
										imageName = '';
										notice('Скопировано');
									});
								}
							}
						);
					}
				});
			window.scrollTo(0, y);
		}
	};
	const exportGIF = () => {
		const y = window.scrollY;
		let images = [];
		for (let i = 0; i < 3; i++) {
			window.scrollTo(0, 0); // эмуляция прокрутки окна к верху, для исправления бага html2canvas
			html2canvas(document.querySelectorAll('.banner')[i])
				.then((canvas) => {
					let image = canvas.toDataURL();
					images.push(image);
				})
				.then(() => {
					if (i === 2) {
						gifshot.createGIF(
							{
								images: images,
								interval: time,
								gifWidth: width,
								gifHeight: height
							},
							function (obj) {
								if (!obj.error) {
									const image = obj.image;

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
									fileRef.putString(image, 'data_url').then(() => {
										fetch(`https://api.imgbb.com/1/upload?key=9bfbbf5c0172756995a9ebc1990fa389&image=https://firebasestorage.googleapis.com/v0/b/banner-redactor.appspot.com/o/${imageName}?alt=media`).then((response) => response.json()).then(({ data }) => setSrc(data.url))
										imageName = '';
										notice('Создано');
									});
								}
							}
						);
					}
				});
			window.scrollTo(0, y);
		}
	};
	const onFocus = (e) => {
		e.persist();
		navigator.clipboard.writeText(e.target.select());
	};
	return (
		<div className="panel__buttons">
			<div>
				<label htmlFor="result">Скопируйте и сохраните!</label>
				<br />
				<input
					type="text"
					value={src}
					onFocus={onFocus}
					readOnly
					id="result"
				/>
			</div>
			<ButtonExport text="Создать GIF" click={exportGIF} />
			<ButtonExport text="Скопировать как HTML" click={exportHTML} />
		</div>
	);
};

export default Buttons;
