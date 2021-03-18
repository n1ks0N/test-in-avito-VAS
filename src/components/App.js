import React, { useLayoutEffect, useState } from 'react';
import Inputs from './inputs/Inputs';
import Buttons from './buttons/Buttons';
import Alerts from './notifications/Alerts';
import Result from './Result';
import './App.css';
import { url, key } from '../constants/api.json';

const App = ({ dispatch, state, state: { banner } }) => {
	const [imageInput, setImageInput] = useState(''); // для image-input

	const [data, setData] = useState(null); // рекламный контент

	// Buttons.js -> notice() -> Alert.js — для вывода alert
	const [alert, setAlert] = useState({ show: false, text: '' }); // отображение alert: true / false, текст для alert: сохранено / скопировано / сброшено

	useLayoutEffect(() => {
		let req = new XMLHttpRequest();
		req.onreadystatechange = () => {
			// eslint-disable-next-line
			if (req.readyState == XMLHttpRequest.DONE) {
				const result = JSON.parse(req.responseText).record;
				setData(() => result);
				for (let i = 0; i < result.header.banners.length; i++) {
					let script = document.createElement('script');
					script.src = result.header.banners[i].div.split(`'`)[3];
					script.async = true;
					document.body.appendChild(script);
				}
				for (let i = 0; i < result.header.linkslot.length; i++) {
					let script = document.createElement('script');
					script.src = result.header.linkslot[i].div.split(`'`)[13];
					script.async = true;
					document.body.appendChild(script);
				}
				for (let i = 0; i < result.footer.linkslot.length; i++) {
					let script = document.createElement('script');
					script.src = result.footer.linkslot[i].div.split(`'`)[13];
					script.async = true;
					document.body.appendChild(script);
				}
			}
		};
		req.open('GET', url, true);
		req.setRequestHeader('X-Master-Key', key);
		req.send();

		console.log(`
	   _ _                    
 _ __ (_) | _____  ___  _ __  
| '_ \\| | |/ / __|/ _ \\| '_ \\ 
| | | | |   <\\__ \\ (_) | | | |
|_| |_|_|_|\\_\\___/\\___/|_| |_|

Powered on ReactJS 
by https://github.com/n1ks0N
			`);
	}, []);

	const notice = (ntf) => {
		// показ alert
		setAlert(() => {
			// в ntf приходит текст для alert
			return {
				show: true,
				text: ntf
			};
		});
	};

	const changeMain = ({ param, name }) => {
		// изменение общих параметров
		dispatch({
			type: 'EDIT-MAIN',
			param: param,
			name: name
		});
	};

	const change = ({ name, param, index }) => {
		// главная функция изменения баннера
		dispatch({
			// editReducer
			type: 'EDIT-CHANGE',
			name: name,
			param: param,
			index: index
		});
	};

	const resize = ({ param }) => {
		// изменение select
		dispatch({
			// selectReducer
			type: 'SELECT-CHANGE',
			size: param
		});
		dispatch({
			type: 'EDIT-SELECT',
			width: param.split(' ')[0],
			height: param.split(' ')[2]
		});
	};
	return (
		<>
			<div className="bg"></div>
			<header>
				<h3>Конструктор баннеров</h3>
			</header>
			<main>
				<div className="header">
					{/* рекламная секция linkslot */}
					<div className="ad__list ad__list__links">
						{!!data &&
							data.header.textButtons.map((data, i) => (
								<a
									className="ad__list__links"
									key={i}
									target="_blank"
									rel="noreferrer"
									href={`${data.link}`}
								>
									{data.text}
								</a>
							))}
					</div>
					<div className="ad__list">
						{!!data &&
							data.header.linkslot.map((data, i) => (
								<div key={i} dangerouslySetInnerHTML={{ __html: data.div }} />
							))}
					</div>
					<div className="ad__list">
						{!!data &&
							data.header.banners.map((data, i) => (
								<div key={i} dangerouslySetInnerHTML={{ __html: data.div }} />
							))}
					</div>
				</div>
				<div className="app">
					<h1 align="center">Конструктор баннеров</h1>
					<h2 align="center">
						Создайте свой уникальный анимированный баннер в три шага:
					</h2>
					<div className="main">
						<div className="panel">
							<Inputs
								resize={resize}
								change={change}
								changeMain={changeMain}
								imageInput={imageInput}
								setImageInput={setImageInput}
								state={state}
							/>
						</div>
					</div>
					<Result banner={banner} />
					<Buttons banner={banner} notice={notice} />
					<center>
						<p>
							Если вам был полезен наш конструктор,
							<br />
							Вы можете пожертвовать сколько не жалко..
						</p>
						<iframe
							title="Пожертвование"
							src="https://yoomoney.ru/quickpay/shop-widget?writer=buyer&targets=%D0%9F%D0%BE%D0%B6%D0%B5%D1%80%D1%82%D0%B2%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5&targets-hint=%D0%9F%D0%BE%D0%B6%D0%B5%D1%80%D1%82%D0%B2%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5&default-sum=10&button-text=14&payment-type-choice=on&mobile-payment-type-choice=on&hint=&successURL=&quickpay=shop&account=410014949986324"
							width="423"
							height="227"
							frameBorder="0"
							allowtransparency="true"
							scrolling="no"
						/>
						<div
							className="ya-share2"
							data-curtain
							data-size="l"
							data-shape="round"
							data-services="vkontakte,facebook,odnoklassniki,telegram,twitter,viber,whatsapp,moimir"
						/>
					</center>
				</div>
				<div className="ad__list">
					{!!data &&
						data.footer.linkslot.map((data, i) => (
							<div key={i} dangerouslySetInnerHTML={{ __html: data.div }} />
						))}
				</div>
			</main>
			<footer>
				<h2 className="footer__title">Напишите нам:</h2>
				<iframe
					title="Обратная связь"
					src="https://forms.yandex.ru/u/6035357ceac8405adc0ccc53/?iframe=1"
					frameBorder="0"
					name="ya-form-6035357ceac8405adc0ccc53"
					width="650"
				/>
				<div className="hider">
					© 2021 <br />
					Создание сайтов — Nikson
				</div>
			</footer>
			<Alerts alert={alert} setAlert={setAlert} />
		</>
	);
};

export default App;
