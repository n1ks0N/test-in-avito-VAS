import React, { useRef, useState } from 'react';
import { url, key } from '../../constants/api.json'

const Admin = () => {
	const [data, setData] = useState('')
	const logRef = useRef('')
	const passRef = useRef('')
	const jsonRef = useRef(data)

	const login = () => {
		if (logRef.current.value === 'Aprel16' && passRef.current.value === 'qwerty16') {
			let req = new XMLHttpRequest();
			req.onreadystatechange = () => { // eslint-disable-next-line
				if (req.readyState == XMLHttpRequest.DONE) {
					const result = JSON.parse(req.responseText)
					setData(() => JSON.stringify(result.record, null, 4))
				}
			};
			req.open("GET", url, true);
			req.setRequestHeader("X-Master-Key", key);
			req.send();
		}
	}

	const change = () => {
		setData(() => jsonRef.current.value)
	}
	const send = () => {
		let req = new XMLHttpRequest();

		req.open("PUT", url, true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", key);
		req.send(`${data}`);
	}
	return (
		<div className="">
			<div className="login">
				<h1>Админ-панель</h1>
				<input placeholder="login" ref={logRef} /><br />
				<input placeholder="password" ref={passRef} /><br />
				<button onClick={login}>Войти</button>
			</div>
			{!!data && <div className="content">
				<textarea style={{ width: '90vw', height: '80vh' }} value={data} onChange={change} ref={jsonRef}></textarea>
				<button onClick={send}>Изменить</button>
			</div>}
		</div>
	);
};

export default Admin;
