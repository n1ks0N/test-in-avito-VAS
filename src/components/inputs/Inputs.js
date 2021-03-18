import React, { useEffect, useState } from 'react';
import Banner from '../Banner';
import Select from './types/Select';
import InputColor from './types/InputColor';
import InputText from './types/InputText';
import Textarea from './types/Textarea';
import InputFile from './types/InputFile';
import Checkbox from './types/Checkbox';
import Range from './types/Range';
import './Inputs.css';

const Inputs = ({
	resize,
	change,
	imageInput,
	setImageInput,
	changeMain,
	state: {
		select,
		banner,
		banner: { width, height, count, properties, time, link }
	}
}) => {
	const [counter, setCounter] = useState([3, 1, 2]);
	useEffect(() => {
		let nums = [count];
		for (let i = 1; i <= 3; i++) {
			if (Number(count) !== i) nums.push(i);
		}
		setCounter(() => nums);
	}, [count]);

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
		/* изменение массива шрифтов: 
		['font_1', 'font_2', 'font_3'] => *chose font_2* =>
		=> ['font_2', 'font_1', 'font_3'] */
		let arr = ['OpenSans', 'Roboto', 'Comfortaa'];
		const i = arr.indexOf(param);
		arr.unshift(param);
		arr.splice(i + 1, 1);
		change({
			param: arr,
			name: 'font',
			index: index
		});
	};

	const mainChanger = ({ param, name }) => {
		// изменение время анимации
		changeMain({
			param: param,
			name: name
		});
	};

	const deleteImage = (e) => {
		// удаление изображения с баннера
		change({
			param: '',
			name: 'image',
			index: e.target.id
		});
	};

	const resetColor = (i) => {
		change({
			param: 'inherit',
			name: 'bgColor',
			index: i
		});
	};
	return (
		<>
			<h4>Шаг 1: выберите размер баннера и количество изображений</h4>
			<div className="panel__group">
				<Select
					text="Ширина x Высота"
					name="size"
					change={sizeReader}
					value={select}
				/>
			</div>
			<div className="panel__group">
				<Select
					text="Количество изображений"
					name="count"
					change={mainChanger}
					value={counter}
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
								value={data.font}
								change={fontReader}
								i={i}
							/>
							<div style={{ width: '65px', height: '38px' }}>
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
						<div className="panel__group-btn">
							<InputColor
								text="Цвет фона &nbsp;"
								value={data.bgColor}
								name="bgColor"
								change={change}
								i={i}
							/>
							<button
								type="button"
								className="close"
								onClick={() => resetColor(i)}
							>
								&times;
							</button>
						</div>
					</div>
					<div className="panel__group">
						<label htmlFor="panel-image">
							Изображение
							<br />
							<span>Загрузите с компьютера</span>
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
			<h4>Шаг 3: установите время анимации и ссылку для html-баннера</h4>
			<InputText
				text="Время анимации"
				name="time"
				type="number"
				value={time}
				change={mainChanger}
			/>
			<InputText
				text="Ссылка на баннер"
				name="link"
				type="text"
				value={link}
				change={mainChanger}
			/>
		</>
	);
};

export default Inputs;
