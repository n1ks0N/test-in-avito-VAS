import React from 'react';
import ButtonExport from './types/ButtonExport';
import './Buttons.css';

const Buttons = ({ notice, banner: { width, height, properties, time } }) => {
	const html = `<div class="banner" id="el0"> <p class="banner__text">${
		properties[0].text
	}</p></div><div class="banner" id="el1"> <p class="banner__text">${
		properties[1].text
	}</p></div><div class="banner" id="el2"> <p class="banner__text">${
		properties[2].text
	}</p></div> <style> .banner { position: relative; text-align: center; cursor: pointer; display: flex; flex-direction: row; align-items: center; justify-content: center; width: ${width}px; height: ${height}px; background-color: #fff; background-repeat: no-repeat; border: 1px solid #000; }#el0 {color: ${
		properties[0].color
	};font-weight: ${properties[0].bold ? 'bold' : 'normal'};font-style: ${
		properties[0].italic ? 'italic' : 'normal'
	};font-size: ${properties[0].size}px;font-family: ${
		properties[0].font.fonts[0]
	};
	background-image: url(${properties[0].image});
	background-position: ${properties[0].left}px ${properties[0].top}px;
	background-size: ${properties[0].imgSize}%;
}#el1 {color: ${properties[1].color};font-weight: ${
		properties[1].bold ? 'bold' : 'normal'
	};font-style: ${properties[1].italic ? 'italic' : 'normal'};font-size: ${
		properties[1].size
	}px;font-family: ${properties[1].font.fonts[0]};display: none; background-image: url(${properties[1].image});
	background-position: ${properties[1].left}px ${properties[1].top}px;
	background-size: ${properties[1].imgSize}%;}#el2 {color: ${
		properties[2].color
	};font-weight: ${properties[2].bold ? 'bold' : 'normal'};font-style: ${
		properties[2].italic ? 'italic' : 'normal'
	};font-size: ${properties[2].size}px;font-family: ${
		properties[2].font.fonts[2]
	};display: none; background-image: url(${properties[2].image});
	background-position: ${properties[2].left}px ${properties[2].top}px;
	background-size: ${properties[2].imgSize}%;} .banner__text { width: 100%; margin: 0; z-index: 1; overflow: hidden; line-height: 1.2em; max-height: 3.6em; text-align: center; } </style> <script>let count = 0; setInterval(() => {count < 2 ? count++ : count = 0;document.getElementById(\`el\${count ? count-1 : 2}\`).style.display = 'none';document.getElementById(\`el\${count}\`).style.display = 'flex';}, ${time}000)</script>`;
	const exportHTML = () => {
		navigator.clipboard.writeText(html);
		notice('Скопировано');
	};
	return (
		<div className="panel__buttons">
			<div>
				<label htmlFor="result">Скопируйте и сохраните!</label>
				<br />
				<input
					type="text"
					value={html}
					onClick={exportHTML}
					readOnly
					id="result"
				/>
			</div>
			<ButtonExport text="Скопировать как HTML" click={exportHTML} />
		</div>
	);
};

export default Buttons;
