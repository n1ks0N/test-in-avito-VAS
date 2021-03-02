import React, { useEffect, useState } from 'react';
import ButtonExport from './types/ButtonExport';
import html2canvas from 'html2canvas';
import gifshot from 'gifshot';
import './Buttons.css';

const Buttons = ({ notice, banner: { width, height, properties, time } }) => {
	const html = `<div class="banner" id="el0"> <p class="banner__text">${properties[0].text
		}</p></div><div class="banner" id="el1"> <p class="banner__text">${properties[1].text
		}</p></div><div class="banner" id="el2"> <p class="banner__text">${properties[2].text
		}</p></div> <style> .banner { position: relative; text-align: center; cursor: pointer; display: flex; flex-direction: row; align-items: center; justify-content: center; width: ${width}px; height: ${height}px; background-color: #fff; background-repeat: no-repeat; border: 1px solid #000; }#el0 {color: ${properties[0].color
		};font-weight: ${properties[0].bold ? 'bold' : 'normal'};font-style: ${properties[0].italic ? 'italic' : 'normal'
		};font-size: ${properties[0].size}px;font-family: ${properties[0].font[0]};
	background-image: url(${properties[0].image});
	background-position: ${properties[0].left}px ${properties[0].top}px;
	background-size: ${properties[0].imgSize}%;
}#el1 {color: ${properties[1].color};font-weight: ${properties[1].bold ? 'bold' : 'normal'
		};font-style: ${properties[1].italic ? 'italic' : 'normal'};font-size: ${properties[1].size
		}px;font-family: ${properties[1].font[0]
		};display: none; background-image: url(${properties[1].image});
	background-position: ${properties[1].left}px ${properties[1].top}px;
	background-size: ${properties[1].imgSize}%;}#el2 {color: ${properties[2].color
		};font-weight: ${properties[2].bold ? 'bold' : 'normal'};font-style: ${properties[2].italic ? 'italic' : 'normal'
		};font-size: ${properties[2].size}px;font-family: ${properties[2].font[2]
		};display: none; background-image: url(${properties[2].image});
	background-position: ${properties[2].left}px ${properties[2].top}px;
	background-size: ${properties[2].imgSize
		}%;} .banner__text { width: 100%; margin: 0; z-index: 1; overflow: hidden; line-height: 1.2em; max-height: 3.6em; text-align: center; } </style> <script>let count = 0; setInterval(() => {count < 2 ? count++ : count = 0;document.getElementById(\`el\${count ? count-1 : 2}\`).style.display = 'none';document.getElementById(\`el\${count}\`).style.display = 'flex';}, ${time}000)</script>`;
	const [link, setLink] = useState(html);
	const exportHTML = () => {
		navigator.clipboard.writeText(html);
		notice('Скопировано');
	};
	const [src, setSrc] = useState('');
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
						const createGIF = () => {
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
										setSrc(() => image);
										var myHeaders = new Headers();
										myHeaders.append("Authorization", "Client-ID {b606abe6f82246c}");

										var formdata = new FormData();
										formdata.append("image", `${image}`)
										var requestOptions = {
											method: 'POST',
											headers: myHeaders,
											body: formdata,
											redirect: 'follow'
										};

										fetch("https://api.imgur.com/3/image", requestOptions)
											.then(response => response.text())
											.then(result => console.log(result))
											.catch(error => console.log('error', error));
									}
								}
							);
						};
						createGIF();
					}
				});
			window.scrollTo(0, y);
		}
		images = [];
	};
	return (
		<div className="panel__buttons">
			<img id="animatedGIF" src={src} />
			<div>
				<label htmlFor="result">Скопируйте и сохраните!</label>
				<br />
				<input
					type="text"
					value={link}
					onClick={exportHTML}
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
