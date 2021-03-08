import React, { useRef, useState } from 'react';
import { url, key } from '../../constants/api.json';
import InputText from '../inputs/types/InputText';
import './Admin.css'

const Admin = () => {
	const [data, setData] = useState('');
	const logRef = useRef('');
	const passRef = useRef('');

	const login = () => {
		if (
			logRef.current.value === 'Aprel16' &&
			passRef.current.value === 'qwerty16'
		) {
			let req = new XMLHttpRequest();
			req.onreadystatechange = () => {
				// eslint-disable-next-line
				if (req.readyState == XMLHttpRequest.DONE) {
					const result = JSON.parse(req.responseText)
					setData(() => result.record)
				}
			};
			req.open('GET', url, true);
			req.setRequestHeader('X-Master-Key', key);
			req.send();
		}
	};

	const change = ({ param, name, index }) => {
		let value = param.replaceAll(`"`, `'`) // все кавычки заменяются на одиночные
		value = value.replaceAll("`", "'") // чтобы избежать бага при конвертировании в JSON
		const section = name.split('.')[0];
		const category = name.split('.')[1];
		const type = name.split('.')[2];
		setData((prev) => {
			let arr = prev[section][category]
			// запись нового value
			arr[index] = {
				...arr[index],
				[type]: value
			}
			return {
				...prev,
				[section]: {
					...prev[section],
					[category]: arr
				}
			}
		})
	};
	const del = ({ target: { id } }) => {
		const section = id.split('.')[0];
		const category = id.split('.')[1];
		const index = id.split('.')[2];
		let allow = true // исправление бага
		setData((prev) => {
			if (allow && prev[section][category].length > 1) {
				allow = false // исправление бага
				let arr = prev[section][category]
				arr.splice(index, 1)
				return {
					...prev,
					[section]: {
						...prev[section],
						[category]: arr
					}
				}
			} else {
				return prev
			}
		})
		console.log(data[section][category])
	}
	const add = ({ target: { id } }) => {
		const section = id.split('.')[0];
		const category = id.split('.')[1];
		let allow = true; // исправление бага
		setData((prev) => {
			if (allow) {
				allow = false // исправление бага
				let arr = prev[section][category]
				let push = {}
				// создание нового пустого объекта и добавление в конец массива
				for (let key in arr[arr.length - 1]) {
					push = {
						...push,
						[key]: ''
					}
				}
				arr.push(push)
				return {
					...prev,
					[section]: {
						...prev[section],
						[category]: arr
					}
				}
			} else {
				return prev
			}
		})
	}

	const send = () => {
		let req = new XMLHttpRequest();
		req.open('PUT', url, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.setRequestHeader('X-Master-Key', key);
		req.send(JSON.stringify(data));
	};
	return (
		<div className="">
			<div className="login">
				<h1>Админ-панель</h1>
				<input placeholder="login" ref={logRef} />
				<br />
				<input placeholder="password" ref={passRef} />
				<br />
				<button onClick={login}>Войти</button>
			</div>
			{!!data && (
				<div className="content">
					<h2 align="center">Header</h2>
					<h3 align="center">TextButtons</h3>
					{Object.values(data.header.textButtons).map((data, i) =>
						<div id={`headerTextButtons${i}`} className="section" key={i}>
							<InputText
								text="Текст"
								type="text"
								value={data.text}
								name={`header.textButtons.text`}
								change={change}
								i={i}
							/>
							<InputText
								text="Ссылка"
								type="text"
								value={data.link}
								name={`header.textButtons.link`}
								change={change}
								i={i}
							/>
							<button type="button" className="btn btn-danger btn-sm" onClick={(e) => del(e)} id={`header.textButtons.${i}`}>Удалить</button>
						</div>
					)}
					<center><button type="button" className="btn btn-success" onClick={(e) => add(e)} id={`header.textButtons`}>Добавить</button></center>
					<h3 align="center">LinkSlot</h3>
					{Object.values(data.header.linkslot).map((data, i) =>
						<div className="section" key={i}>
							<InputText
								text="Код"
								type="text"
								value={data.div}
								name={`header.linkslot.div`}
								change={change}
								i={i}
							/>
							<button type="button" className="btn btn-danger btn-sm" onClick={(e) => del(e)} id={`header.linkslot.${i}`}>Удалить</button>
						</div>
					)}
					<center><button type="button" className="btn btn-success" onClick={(e) => add(e)} id={`header.linkslot`}>Добавить</button></center>
					<h3 align="center">Banners</h3>
					{Object.values(data.header.banners).map((data, i) =>
						<div className="section" key={i}>
							<InputText
								text="Код"
								type="text"
								value={data.div}
								name={`header.banners.div`}
								change={change}
								i={i}
							/>
							<button type="button" className="btn btn-danger btn-sm" onClick={(e) => del(e)} id={`header.banners.${i}`}>Удалить</button>
						</div>
					)}
					<center><button type="button" className="btn btn-success" onClick={(e) => add(e)} id={`header.banners`}>Добавить</button></center>
					<h2 align="center">Footer</h2>
					<h3 align="center">Linkslot</h3>
					{Object.values(data.footer.linkslot).map((data, i) =>
						<div className="section" key={i}>
							<InputText
								text="Код"
								type="text"
								value={data.div}
								name={`footer.linkslot.div`}
								change={change}
								i={i}
							/>
							<button type="button" className="btn btn-danger btn-sm" onClick={(e) => del(e)} id={`footer.linkslot.${i}`}>Удалить</button>
						</div>
					)}
					<center><button type="button" className="btn btn-success" onClick={(e) => add(e)} id={`footer.linkslot`}>Добавить</button></center>
					<center><button type="button" className="btn btn-primary btn-lg" onClick={send}>Изменить</button></center>
				</div>
			)}
		</div>
	);
};

export default Admin;
