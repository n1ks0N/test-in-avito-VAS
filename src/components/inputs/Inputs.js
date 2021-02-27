import React from 'react';
import Banner from '../Banner'
import Select from './types/Select';
import InputColor from './types/InputColor';
import InputText from './types/InputText';
import Textarea from './types/Textarea';
import InputFile from './types/InputFile';
import Checkbox from './types/Checkbox';
import Range from './types/Range';
import { fonts } from '../../constants/fonts.json';
import './Inputs.css';

const Inputs = ({
	resize,
	change,
	imageInput,
	setImageInput,
	state: {
		select,
		banner,
		banner: { width, height, text, color, image, link, bold, italic, size, left, top, imgSize }
	}
}) => {
	const sizeReader = ({ param }) => {
		change({
			// editReducer
			param: param.split(' ')[0],
			name: 'width'
		});
		change({
			// editReducer
			param: param.split(' ')[2],
			name: 'height'
		});
		resize({
			// selectReducer
			param: param
		});
	};

	const fileReader = ({ param }) => {
		if (param) {
			let images = [];
			for (let i = 0; i < param.length; i++) {
				let reader = new FileReader();
				reader.readAsDataURL(param[i]);
				reader.onload = () => {
					if (reader.result !== imageInput && reader.result !== image) {
						setImageInput(() => ''); // image-input
						images.push(reader.result);
					}
					if (i === param.length - 1) {
						change({
							// editReducer
							param: images,
							name: 'image'
						});
					}
				};
			}
		}
	};

	const urlReader = ({ param }) => {
		setImageInput(() => param); // image-input
		if (param !== image && param !== '') {
			change({
				// editReducer
				param: param,
				name: 'image'
			});
		}
	};

	const fontReader = ({ param }) => {
		let arr = fonts;
		let index = arr.indexOf(param);
		arr.unshift(param);
		arr.splice(++index, 1);
		change({
			param: arr,
			name: 'font'
		});
	};

	return (
		<>
			<div className="panel__group">
				<Select
					text="Ширина x Высота"
					name="size"
					change={sizeReader}
					value={select}
				/>
			</div>
			<Banner banner={banner} />
			<div className="panel__group">
				<Textarea
					text="Текстовое содержание"
					type="text"
					value={text}
					name="text"
					placeholder="Введите текст"
					change={change}
				/>
				<div className="panel__group__inputs">
					<Select text="" name="font" value={fonts} change={fontReader} />
					<div style={{ width: `65px` }}>
						<InputText
							text=""
							type="number"
							value={size}
							name="size"
							placeholder="Размер"
							change={change}
						/>
					</div>
					<Checkbox
						text="Жирность"
						type="bold"
						value={bold}
						name="bold"
						change={change}
					/>
					<Checkbox
						text="Курсив"
						type="italic"
						value={italic}
						name="italic"
						change={change}
					/>
				</div>
			</div>

			<div className="panel__group panel__double-input panel__group-color">
				<InputColor
					text="Цвет текста"
					value={color}
					name="color"
					change={change}
				/>
			</div>

			<div className="panel__group">
				<label htmlFor="panel-image">
					Изображение
					<br />
					<span>Вставьте URL картинки или загрузите с компьютера</span>
				</label>
				<div className="panel__double-input" id="panel-image">
					<div className="input-group">
						<InputFile
							text="Выберите изображение"
							name="image"
							accept="image/*"
							change={fileReader}
							multiple={false}
						/>
					</div>
				</div>
				<div className="panel__group__input-color">
				<Range
					text="⬅/➡"
					name="left"
					max={width}
					min={-width}
					value={left}
					change={change}
				/>
				<Range
					text="⬆/⬇"
					name="top"
					max={height}
					min={-height}
					value={top}
					change={change}
				/>
				<Range
					text="➕/➖"
					name="imgSize"
					max={200}
					min={10}
					value={imgSize}
					change={change}
				/>
				</div>
			</div>
		</>
	);
};

export default Inputs;
