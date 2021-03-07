import React, { useRef, useState } from 'react';
import { url, key } from '../../constants/api.json';
import InputText from '../inputs/types/InputText';

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
					// const result = JSON.parse(req.responseText)
					const result = JSON.parse(`{
						"header": {
							"textButtons": [
								{
									"text": "Бесплатная реклама и пиар",
									"link": "https://aprel16.ru/"
								},
								{
									"text": "",
									"link": "#"
								},
								{
									"text": "как заработать в интернете",
									"link": "#"
								},
								{
									"text": "инвестирование",
									"link": "#"
								},
								{
									"text": "другое",
									"link": "#"
								},
								{
									"text": "linkslot",
									"link": "#"
								},
								{
									"text": "новинки",
									"link": "#"
								},
								{
									"text": "популярное",
									"link": "#"
								},
								{
									"text": "как заработать в интернете",
									"link": "#"
								},
								{
									"text": "инвестирование",
									"link": "#"
								},
								{
									"text": "другое",
									"link": "#"
								},
								{
									"text": "linkslot",
									"link": "#"
								},
								{
									"text": "новинки",
									"link": "#"
								},
								{
									"text": "популярное",
									"link": "#"
								},
								{
									"text": "как заработать в интернете",
									"link": "#"
								},
								{
									"text": "инвестирование",
									"link": "#"
								},
								{
									"text": "другое",
									"link": "#"
								},
								{
									"text": "linkslot",
									"link": "#"
								},
								{
									"text": "Бесплатная реклама и пиар",
									"link": "https://aprel16.ru/"
								}
							],
							"linkslot": [
								{
									"div": "<center><a href='https://linkslot.ru/link.php?id=309209' target='_blank' rel='noopener'>Купить ссылку здесь за <span id='linprice_309209'></span> руб.</a><div id='linkslot_309209' style='margin: 10px 0;'><script src='https://linkslot.ru/lincode.php?id=309209' async></script></div><a href='https://linkslot.ru/?ref=Aprel16' target='_blank' rel='noopener'>Поставить к себе на сайт</a></center>"
								}
							],
							"banners": [
								{
									"div": "<div id='linkslot_314314'><script src='https://linkslot.ru/bancode.php?id=314314' async></script></div>"
								},
								{
									"div": "<div id='linkslot_314314'><script src='https://linkslot.ru/bancode.php?id=314314' async></script></div>"
								}
							]
						},
						"footer": {
							"linkslot": [
								{
									"div": "<center><a href='https://linkslot.ru/link.php?id=309209' target='_blank' rel='noopener'>Купить ссылку здесь за <span id='linprice_309209'></span> руб.</a><div id='linkslot_309209' style='margin: 10px 0;'><script src='https://linkslot.ru/lincode.php?id=309209' async></script></div><a href='https://linkslot.ru/?ref=Aprel16' target='_blank' rel='noopener'>Поставить к себе на сайт</a></center>"
								}
							],
							"banners": []
						}
					}`);
					// setData(() => JSON.stringify(result.record, null, 4))
					setData(() => result);
				}
			};
			req.open('GET', 'url', true);
			req.setRequestHeader('X-Master-Key', key);
			req.send();
		}
	};

	const change = ({ param, name, index }) => {
		// let state = data;
		const section = name.split('.')[0];
		const category = name.split('.')[1];
		const type = name.split('.')[2];
		setData((prev) => {
			return {
				...prev,
				[section]: {
					...prev[section],
					[category]: {
						...prev[section][category],
						[index]: { ...prev[section][category][index], [type]: param }
					}
				}
			}
		})
	};
	const send = () => {
		let req = new XMLHttpRequest();

		req.open('PUT', "url", true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.setRequestHeader('X-Master-Key', key);
		req.send(JSON.stringify(data));
	};
	console.log(data)
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
					<h3>TextButtons</h3>
					{Object.values(data.header.textButtons).map((data, i) =>
						data !== 0 ? <div id={`headerTextButtons${i}`} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}} key={i}>
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
						</div> : <></>
					)}
					<button onClick={send}>Изменить</button>
				</div>
			)}
		</div>
	);
};

export default Admin;
