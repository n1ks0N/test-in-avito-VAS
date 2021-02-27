import React from 'react';
import ButtonExport from './types/ButtonExport';
import ButtonReset from './types/ButtonReset';
import html2canvas from 'html2canvas';
import './Buttons.css';

const Buttons = ({
	reset,
	notice,
	banner: {
		width,
		height,
		text,
		bg,
		color,
		image,
		link,
		bold,
		italic,
		size,
		font
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
		const html = `
          <div class="banner">
            <p class="banner__text">${text}</p>
            <img class="banner__img" alt="banner" align="center" src="${
							image[0]
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
              background: ${bg.style};
              color: ${color.style};
              font-weight: ${bold ? 'bold' : 'normal'};
		          font-style: ${italic ? 'italic' : 'normal'};
		          font-size: ${size}px;
		          font-family: ${font[0]};
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
            document.querySelector('.banner').addEventListener('click', () => window.open('${link}', '_blank'))
						const image = [${image}]
						let img = "${image[0]}"
						if (image.length > 1) {
							setInterval(() => {
								let i = image.indexOf(img)
								if (i < image.length - 1) {
									setImg(() => image[i+1])
								} else {
									setImg(() => image[0])
								}
							}, 5000)
						}
          </script>
        `;
		navigator.clipboard.writeText(html);
		notice('Скопировано');
	};
	return (
		<div className="panel__buttons">
			<ButtonReset click={reset} />
			<ButtonExport text="Сохранить как PNG" click={exportPNG} />
			<ButtonExport text="Скопировать как HTML" click={exportHTML} />
		</div>
	);
};

export default Buttons;
