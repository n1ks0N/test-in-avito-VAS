import React from 'react';
import Banner from '../Banner';
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
	delay,
	state: {
		select,
		banner,
		banner: { width, height, properties, time }
	}
}) => {
	const sizeReader = ({ param }) => {
		resize({
			// selectReducer
			param: param
		});
	};

	const fileReader = ({ param, index }) => {
		if (param) {
			let reader = new FileReader();
			reader.readAsDataURL(param);
			reader.onload = () => {
				if (
					reader.result !== imageInput &&
					reader.result !== properties[index].image
				) {
					setImageInput(() => ''); // image-input
					change({
						// editReducer
						param: reader.result,
						name: 'image',
						index: index
					});
				}
			};
		}
	};

	const fontReader = ({ param, index }) => {
		let arr = fonts;
		const i = arr.indexOf(param);
		arr.unshift(param);
		arr.splice(i + 1, 1);
		change({
			param: arr,
			name: 'font',
			index: index
		});
	};

	const timeChanger = ({ param }) => {
		delay({
			param: param
		});
	};

	const deleteImage = (e) => {
		change({
			param: '',
			name: 'image',
			index: e.target.id
		});
	};
	return (
		<>
			<h4>Шаг 1: выберите размер баннера</h4>
			<div className="panel__group">
				<Select
					text="Ширина x Высота"
					name="size"
					change={sizeReader}
					value={select}
				/>
			</div>
			<h4>Шаг 2: загрузите изображения и придумайте слоган для каждого</h4>
			{properties.map((data, i) => (
				<div key={i}>
					<Banner banner={banner} properties={properties[i]} i={i} />
					<br />
					<button
						type="button"
						className="btn btn-secondary btn-sm"
						onClick={deleteImage}
						id={i}
					>
						Удалить изображение
					</button>
					<div className="panel__group">
						<Textarea
							text="Текстовое содержание"
							type="text"
							value={data.text}
							name="text"
							placeholder="Введите текст"
							change={change}
							i={i}
						/>
						<div className="panel__group__inputs">
							<Select
								text=""
								name="font"
								value={fonts}
								change={fontReader}
								i={i}
							/>
							<div style={{ width: `65px` }}>
								<InputText
									text=""
									type="number"
									value={data.size}
									name="size"
									placeholder="Размер"
									change={change}
									i={i}
								/>
							</div>
							<Checkbox
								text="Жирность"
								type="bold"
								value={data.bold}
								name="bold"
								change={change}
								i={i}
							/>
							<Checkbox
								text="Курсив"
								type="italic"
								value={data.italic}
								name="italic"
								change={change}
								i={i}
							/>
						</div>
					</div>
					<div className="panel__group panel__double-input panel__group-color">
						<InputColor
							text="Цвет текста"
							value={data.color}
							name="color"
							change={change}
							i={i}
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
									i={i}
								/>
							</div>
						</div>
						<div className="panel__group__input-color">
							<Range
								text="⬅/➡"
								name="left"
								max={width}
								min={-width}
								value={data.left}
								change={change}
								i={i}
							/>
							<Range
								text="⬆/⬇"
								name="top"
								max={height}
								min={-height}
								value={data.top}
								change={change}
								i={i}
							/>
							<Range
								text="➖/➕"
								name="imgSize"
								max={200}
								min={10}
								value={data.imgSize}
								change={change}
								i={i}
							/>
						</div>
					</div>
					<hr />
				</div>
			))}
			<h4>Шаг 3: установите время анимации</h4>
			<InputText
				text="Время анимации"
				name="time"
				type="number"
				value={time}
				change={timeChanger}
			/>
		</>
	);
};

export default Inputs;
