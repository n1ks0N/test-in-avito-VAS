import React, { useState } from 'react';
import Inputs from './inputs/Inputs';
import Banner from './Banner';
import Buttons from './buttons/Buttons';
import Alerts from './notifications/Alerts';
import './App.css';
import { header, footer } from '../constants/linkslot.json'

const App = ({ dispatch, state, state: { banner } }) => {
  const [imageInput, setImageInput] = useState(''); // для image-input

  // Buttons.js -> notice() -> Alert.js — для вывода alert
  const [alert, setAlert] = useState({ show: false, text: '' }); // отображение alert: true / false, текст для alert: сохранено / скопировано / сброшено

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

  const change = ({ name, param }) => {
    // главная функция изменения баннера
    dispatch({
      // editReducer
      type: 'EDIT-CHANGE',
      name: name,
      param: param
    });
  };

  const resize = ({ param }) => {
    // изменение select
    dispatch({
      // selectReducer
      type: 'SELECT-CHANGE',
      size: param
    });
  };

  const reset = () => {
    dispatch({ type: 'EDIT-RESET' }); // editReducer
    dispatch({ type: 'SELECT-RESET' }); // selectReducer
    setImageInput(() => ''); // image-input
    notice('Сброшено'); // alert
  };
  console.log('render')
  return (
    <>
      <main>
        <div className="header">
          <div className="ad__list">{header.textButtons.map((data, i) => <a key={i} href={`${data.link}`}>{data.text}</a>)}</div>
          <div className="ad__list">{header.banners.map((data, i) => <a key={i} href={data.link}><img src={`${data.img}`} alt="ad" /></a>)}</div>
        </div>
        <h1 align="center">Редактор баннеров</h1>
        <div className="main">
          <div className="panel">
            <h3>Панель управления</h3>
            <Inputs
              resize={resize}
              change={change}
              imageInput={imageInput}
              setImageInput={setImageInput}
              state={state}
            />
            <br />
            <Buttons banner={banner} notice={notice} reset={reset} />
          </div>
          <Banner banner={banner} />
        </div>
        <div className="ad__list">{footer.banners.map((data, i) => <a key={i} href={data.link}><img src={`${data.img}`} alt="ad" /></a>)}</div>
        <div className="ad__list">{footer.textButtons.map((data, i) => <a key={i} href={`${data.link}`}>{data.text}</a>)}</div>
      </main>
      <h2>Обратная связь</h2>
      <div><iframe title="Обратная связь" src="https://forms.yandex.ru/u/6035357ceac8405adc0ccc53/?iframe=1" frameBorder="0" name="ya-form-6035357ceac8405adc0ccc53" width="650" /></div>
      <Alerts alert={alert} setAlert={setAlert} />
    </>
  );
};

export default App;
