import React, { useState } from 'react'
import Inputs from './inputs/Inputs'
import Banner from './Banner'
import Buttons from './buttons/Buttons'
import Alerts from './notifications/Alerts'
/*
Ошибка: 
1. при изменении цвета фона и текста, он не сбрасывается в input, а после второго изменения не сбросывается вовсе
Изменения:
1. считать длину строки на js
*/
const App = ({ dispatch, state, state: { banner, banner: { text, image } } }) => {
  const [valueURL, setValueURL] = useState('') // для input-image

  // notice -> alertStyle[alert] -> useEffect[alert] — для вывода alert
  const [alert, setAlert] = useState({ show: false, text: '' }) // отображение alert: true / false, текст для alert: 'сохранено' / 'скопировано' 

  const notice = (ntf) => { // в ntf приходит текст alert
    setAlert(() => {
      return {
        show: true,
        text: ntf
      }
    })
  }


  const change = ({ name, param }) => { // в e приходит данные для изменения state
    dispatch({
      type: 'EDIT-CHANGE',
      name: name,
      param: param
    })
  }

  console.log('render')
  return (
    <>
      <h1 align="center">Редактор баннеров</h1>
      <main>
        <div className="panel">
          <h3>Панель управления</h3>
          <Inputs
            dispatch={dispatch}
            change={change}
            valueURL={valueURL}
            setValueURL={setValueURL}
            state={state}
          />
          <br />
          <Buttons
            dispatch={dispatch}
            banner={banner}
            notice={notice}
            setValueURL={setValueURL}
          />
        </div>
        <Banner
          text={text}
          image={image}
          banner={banner}
          change={change}
        />
      </main>
      <Alerts
        text={alert.text}
        alert={alert}
        setAlert={setAlert}
      />
    </>
  )
}

export default App