import React, { useState } from 'react'
import Inputs from './inputs/Inputs'
import Banner from './Banner'
import Buttons from './buttons/Buttons'
import Alerts from './notifications/Alerts'
import './App.css'

const App = ({ dispatch, state, state: { banner, banner: { text, image } } }) => {
  const [valueURL, setValueURL] = useState('') // для image-input

  // Buttons.js -> notice() -> Alert.js — для вывода alert
  const [alert, setAlert] = useState({ show: false, text: '' }) // отображение alert: true / false, текст для alert: 'сохранено' / 'скопировано' 

  const notice = (ntf) => { // alert
    setAlert(() => {        // в ntf приходит текст alert
      return {
        show: true,
        text: ntf
      }
    })
  }


  const change = ({ name, param }) => { // главная функция изменения 
    dispatch({ // editReducer
      type: 'EDIT-CHANGE',
      name: name,
      param: param
    })
  }

  const resize = ({ param }) => {
    dispatch({ // selectReducer
      type: 'SELECT-CHANGE',
      size: param
    })
  }

  const reset = () => {
    dispatch({ type: 'EDIT-RESET' }) // editReducer
    dispatch({ type: 'SELECT-RESET' }) // selectReducer
    setValueURL(() => '') // image-input
    notice('Сброшено') // alert
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
            resize={resize}
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
            reset={reset}
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