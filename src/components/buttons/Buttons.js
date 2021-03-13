import React, { useState, useEffect } from 'react';
import ButtonExport from './types/ButtonExport';
import html2canvas from 'html2canvas';
import gifshot from 'gifshot';
import './Buttons.css';
import { fbStorage } from '../../constants/config';

const Buttons = ({ notice, banner, banner: { width, height, time } }) => {
	const storageRef = fbStorage.storage().ref();
	const [src, setSrc] = useState(''); // ссылка на гифку
	const [images, setImages] = useState([]); // base64 для gif
	const [dare, setDare] = useState(''); // для уведомлений
	// создание gif
	useEffect(() => {
		if (images.length === 3) { // gif создаётся только из трёх изображений
			// images --> gif
			gifshot.createGIF({
					"images": images,
					"interval": time,
					"gifWidth": width,
					"gifHeight": height,
					"numWorkers": 8,
					'sampleInterval': 1,
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
									setSrc(() => data.url);
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
		const elem = document.querySelectorAll('.banner')
		for (let i = 0; i < banner.properties.length; i++) {			
			// сохрание width для будущего возврата изначальной ширины
			// имеет смысл, когда баннер шириной более 800px
			const savedElemWidth = elem[i].style.width
			elem[i].style.width = `${width}px`

			// html --> canvas --> image
			html2canvas(elem[i], {
				logging: false,
				allowTaint: false,
				backgroundColor: "#ffffff",
				scale: 1,
				scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight
			}).then((canvas) => {
				const img = canvas.toDataURL();
				// сбор изображений
				// после достижения трёх - создание gif из useEffect
				setImages((prev) => [...prev, img]);
			});
			elem[i].style.width = savedElemWidth;
		}
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
