import React from 'react';
import ButtonExport from './types/ButtonExport';
import html2canvas from 'html2canvas';
import './Buttons.css';

const Buttons = ({
	notice,
	banner: {
		width,
		height,
		properties,
		time
	}
}) => {
	const exportPNG = () => {
		const y = window.scrollY;
		window.scrollTo(0, 0); // эмуляция прокрутки окна к верху, для исправления бага html2canvas
		html2canvas(document.querySelector('.banner')).then((canvas) => {
			const image = canvas.toDataURL();
			const a = document.createElement('A');
			a.href = image; // eslint-disable-next-line
			a.download = image.substr(image.lastIndexOf('+') + 1).split(/[\=\$]/g)[0];
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		});
		window.scrollTo(0, y);
		notice('Сохранено');
	};

	const exportHTML = () => {
		// const styles = properties.map(data => ({
		// 	'color': `${data.color}`,
		// 	'font-weight': `${data.bold ? 'bold' : 'normal'}`,
		// 	'font-style': `${data.italic ? 'italic' : 'normal'}`,
		// 	'font-size': `${data.size}px`,
		// 	'font-family': `${data.font[0]}`
		// }))
		const props = JSON.stringify(properties);
		const html = `
          <div class="banner">
            <p class="banner__text">${properties[0].text}</p>
            <img class="banner__img" alt="banner" align="center" src="${properties[0].image
			}">
          </div>
          <style>
            .banner {
              position: relative;
              text-align: center;
              font-size: 24px;
              cursor: pointer;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              width: ${width}px;
              height: ${height}px;
              background: #fff;
            }
            .banner__img {
              position: absolute;
              bottom: 0;
              right: 0;
              max-width: ${width}px;
              max-height: ${height}px;
            }
            .banner__text {
              width: 100%;
              margin: 0;
              z-index: 1;
              overflow: hidden;
              line-height: 1.2em;
              max-height: 3.6em;
              text-align: center;  
            }
          </style>
          <script>
						const props = ${props}
						const styles = props.map(data => ({
							color: data.color;
						}))
						let style = styles[0];
						let count = 0;
            setInterval(() => {
							if (count < 2) {
								count++;
							} else {
								count = 0;
							}
							style = styles[count]
						}, ${time}000)
						document.querySelector('.banner').style = style;
						document.querySelector('.banner__text').text = props[count].text;
          </script>
        `;
		navigator.clipboard.writeText(html);
		notice('Скопировано');
	};
	return (
		<div className="panel__buttons">
			<ButtonExport text="Сохранить как GIF" click={exportPNG} />
			<ButtonExport text="Скопировать как HTML" click={exportHTML} />
		</div>
	);
};

export default Buttons;
