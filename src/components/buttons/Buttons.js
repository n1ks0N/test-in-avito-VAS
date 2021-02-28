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
		html2canvas(document.querySelectorAll('.banner')[0]).then((canvas) => {
		})
		window.scrollTo(0, y);
		notice('Сохранено');
	};

	const exportHTML = () => {
		const props = JSON.stringify(properties);
		const html = `
          <div class="banner" id="el0">
            <p class="banner__text">${properties[0].text}</p>
            <img class="banner__img" alt="banner" src="${properties[0].image
			}">
			</div>
			<div class="banner" id="el1">
            <p class="banner__text">${properties[1].text}</p>
            <img class="banner__img" alt="banner" src="${properties[1].image
			}">
			</div>
			<div class="banner" id="el2">
            <p class="banner__text">${properties[2].text}</p>
            <img class="banner__img" alt="banner" src="${properties[2].image
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
						#el0 {
							color: ${properties[0].color};
							font-weight: ${properties[0].bold ? 'bold' : 'normal'};
							font-style: ${properties[0].italic ? 'italic' : 'normal'};
							font-size: ${properties[0].size}px;
							font-family: ${properties[0].font.fonts[0]};
						}
						#el1 {
							color: ${properties[1].color};
							font-weight: ${properties[1].bold ? 'bold' : 'normal'};
							font-style: ${properties[1].italic ? 'italic' : 'normal'};
							font-size: ${properties[1].size}px;
							font-family: ${properties[1].font.fonts[0]};
							display: none;
						}
						#el2 {
							color: ${properties[2].color};
							font-weight: ${properties[2].bold ? 'bold' : 'normal'};
							font-style: ${properties[2].italic ? 'italic' : 'normal'};
							font-size: ${properties[2].size}px;
							font-family: ${properties[2].font.fonts[2]};
							display: none;
						}
            .banner__img {
              position: absolute;
              top: 0;
              left: 0;
              max-width: ${width}px;
              max-height: ${height}px;
            }
						#el0 > .banner__img {
							top: ${properties[0].top}px;
							left: ${properties[0].left}px;
						}
						#el1 > .banner__img {
							top: ${properties[1].top}px;
							left: ${properties[1].left}px;
						}
						#el2 > .banner__img {
							top: ${properties[2].top}px;
							left: ${properties[2].left}px;
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
						let count = 0;
            setInterval(() => {
							count < 2 ? count++ : count = 0;
							document.getElementById(\`el\${count ? count-1 : 2}\`).style.display = 'none';
							document.getElementById(\`el\${count}\`).style.display = 'flex';
						}, ${time}000)
        </script>`;
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
