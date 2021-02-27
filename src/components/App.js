import React, { useState } from 'react';
import Inputs from './inputs/Inputs';
import Banner from './Banner';
import Buttons from './buttons/Buttons';
import Alerts from './notifications/Alerts';
import './App.css';
import { header, footer } from '../constants/linkslot.json';

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
  return (
    <>
      <div className="bg"></div>
      <header>
        <h3>Апрель16</h3>
      </header>
      <main>
        <div className="header">
          <div className="ad__list">
            {header.textButtons.map((data, i) => (
              <a key={i} href={`${data.link}`}>
                {data.text}
              </a>
            ))}
          </div>
          <div className="ad__list">
            {header.banners.map((data, i) => (
              <a key={i} href={data.link}>
                <img src={`${data.img}`} alt="ad" />
              </a>
            ))}
          </div>
        </div>
        <div className="app">
          <h1 align="center">Редактор баннеров</h1>
          <h2 align="center">Создайте свой уникальный анимированный баннер в три шага:</h2>
          <div className="main">
            <div className="panel">
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
          <center><div className="ya-share2" data-curtain data-size="l" data-shape="round" data-services="vkontakte,facebook,odnoklassniki,telegram,twitter,viber,whatsapp"></div></center>
        </div>
        <div className="ad__list">
          {footer.banners.map((data, i) => (
            <a key={i} href={data.link}>
              <img src={`${data.img}`} alt="ad" />
            </a>
          ))}
        </div>
        <div className="ad__list">
          {footer.textButtons.map((data, i) => (
            <a key={i} href={`${data.link}`}>
              {data.text}
            </a>
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
        <div className="hider"></div>
      </footer>
      <Alerts alert={alert} setAlert={setAlert} />
    </>
  );
};

export default App;
