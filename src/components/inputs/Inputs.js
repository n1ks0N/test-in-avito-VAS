import React, { useState } from 'react';
import Select from './types/Select';
import InputGradient from './types/InputGradient';
import InputColor from './types/InputColor';
import InputText from './types/InputText';
import Textarea from './types/Textarea';
import InputFile from './types/InputFile';
import Checkbox from './types/Checkbox'
import { fonts } from '../../constants/fonts.json'
import './Inputs.css';

const Inputs = ({
	resize,
	change,
	imageInput,
	setImageInput,
	state: {
		select,
		banner: { bg, text, color, image, link, bold, italic, size, font }
	}
}) => {
	const [colorType, setColorType] = useState({
		status: 'Linear',
		types: ['Linear', 'Solid']
	});

	const colorReader = ({ param }) => {
		setColorType(() => {
			if (param === 'Solid') {
				return { status: 'Solid', types: ['Solid', 'Linear'] };
			} else {
				return { status: 'Linear', types: ['Linear', 'Solid'] };
			}
		});
	};

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
			const reader = new FileReader();
			reader.readAsDataURL(param);
			reader.onload = () => {
				if (reader.result !== imageInput && reader.result !== image) {
					setImageInput(() => ''); // image-input
					change({
						// editReducer
						param: reader.result,
						name: 'image'
					});
				}
			};
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
		let arr = fonts
		let index = arr.indexOf(param)
		arr.unshift(param)
		arr.splice(++index, 1)
		change({
			param: arr,
			name: 'font'
		})
	}

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

			<div className="panel__group panel__double-input panel__group-color">
				<div className="panel__group__input-color">
					<div className="panel__group__input-color__label">
						<label className="panel__group__special-label">Фоновый цвет</label>
						<Select
							className=""
							text=""
							name="colorType"
							change={colorReader}
							value={colorType.types}
						/>
					</div>
					{colorType.status === 'Solid' ? (
						<InputColor text="" value={bg} name="bg" change={change} />
					) : (
							<InputGradient text="" value={bg} name="bg" change={change} />
						)}
				</div>
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
					<div className="input-group panel-image__wrapper">
						<InputText
							text=""
							type="url"
							value={imageInput}
							name="image"
							placeholder="https://"
							change={urlReader}
						/>
					</div>
					<div className="input-group">
						<InputFile
							text="Выберите изображение"
							name="image"
							accept="image/*"
							change={fileReader}
						/>
					</div>
				</div>
			</div>
			<div className="panel__group">
				<Textarea
					text="Текстовое содержание"
					type="text"
					value={text}
					name="text"
					placeholder="Введите текст"
					change={change}
				/>
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
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
					<Select
						text=""
						name="font"
						value={fonts}
						change={fontReader}
					/>
				</div>
			</div>
			<div className="panel__group">
				<InputText
					text="Ссылка в объявлении"
					type="url"
					value={link}
					name="link"
					placeholder="https://"
					change={change}
				/>
			</div>
		</>
	);
};

export default Inputs;
