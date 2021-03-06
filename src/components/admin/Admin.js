import React, { useEffect, useRef, useState } from 'react';
import InputText from '../inputs/types/InputText';
import Input from '../inputs/types/InputText'

const Admin = ({ state: { record }, dispatch }) => {
	const logRef = useRef('')
	const passRef = useRef('')
	const [values, setValues] = useState([{ name: 'login', value: '' }, { name: 'password', value: '' }])
	const [content, setContent] = useState(false)
	const [data, setData] = useState('')
	const jsonRef = useRef(data)
	const url = "https://api.jsonbin.io/v3/b/604147ea0866664b1088d00a/"
	const apiKey = '$2b$10$Jwcwfsmu6mBoOKgGa0iul.M66dU7mMRTrumpQ5rKCkaGpwCbuMAYG'

	const login = () => {
		let req = new XMLHttpRequest();

			req.onreadystatechange = () => {
				if (req.readyState == XMLHttpRequest.DONE) {
					const result = JSON.parse(req.responseText)
					console.log(result)
					dispatch({
						type: 'GET-ADMIN',
						data: result
					})
					setData(() => JSON.stringify(result.record))
				}
			};

			req.open("GET", url, true);
			req.setRequestHeader("X-Master-Key", apiKey);
			req.send();
	}

	const change = ({ param, name, index }) => {
		// setData(() => jsonRef.current.value)
		values.map(data => { if (data.name === name) return ({ ...data, data: { value: param } }) })
	}
	const send = () => {
		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
			if (req.readyState == XMLHttpRequest.DONE) {
				console.log(req.responseText);
			}
		};

		req.open("PUT", "https://api.jsonbin.io/v3/b/604147ea0866664b1088d00a", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2b$10$Jwcwfsmu6mBoOKgGa0iul.M66dU7mMRTrumpQ5rKCkaGpwCbuMAYG");
		req.send(`${data}`);
	}
	console.log(record)
	return (
		<div className="">
			<div className="login">
				<h1>Админ-панель</h1>
				{/* <input placeholder="login" ref={logRef} /><br />
				<input placeholder="password" ref={passRef} /><br /> */}
				{values.map((data, i) => <InputText
					text={data.name}
					type="text"
					value={data.value}
					name={data.name}
					placeholder={data.name}
					change={change}
					key={i}
					i={i} />
				)}
				<button onClick={login}>Войти</button>
			</div>
			{!!data && <div className="content">
				<textarea style={{ width: '90vw' }} value={data} onChange={change} ref={jsonRef}></textarea>
				<button onClick={send}>Изменить</button>
			</div>}
		</div>
	);
};

export default Admin;
