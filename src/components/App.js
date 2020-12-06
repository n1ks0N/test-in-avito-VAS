import React, { useState } from 'react'
import Inputs from './inputs/Inputs'
import Banner from './Banner'
import Buttons from './buttons/Buttons'
import Alerts from './notifications/Alerts'
import './App.css'

const App = ({ dispatch, state, state: { banner } }) => {
  const [imageInput, setImageInput] = useState('') // для image-input

  /* idea: alert перенести в redux */
  // Buttons.js -> notice() -> Alert.js — для вывода alert
  const [alert, setAlert] = useState({ show: false, text: '' }) // отображение alert: true / false, текст для alert: сохранено / скопировано / сброшено

  const notice = (ntf) => { // показ alert
    setAlert(() => { // в ntf приходит текст для alert
      return {
        show: true,
        text: ntf
      }
    })
  }


  const change = ({ name, param }) => { // главная функция изменения баннера
    dispatch({ // editReducer
      type: 'EDIT-CHANGE',
      name: name,
      param: param
    })
  }

  const resize = ({ param }) => { // изменение select
    dispatch({ // selectReducer
      type: 'SELECT-CHANGE',
      size: param
    })
  }

  const reset = () => {
    dispatch({ type: 'EDIT-RESET' }) // editReducer
    dispatch({ type: 'SELECT-RESET' }) // selectReducer
    setImageInput(() => '') // image-input
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
            resize={resize}
            change={change}
            imageInput={imageInput}
            setImageInput={setImageInput}
            state={state}
          />
          <br />
          <Buttons
            banner={banner}
            notice={notice}
            reset={reset}
          />
        </div>
        <Banner
          banner={banner}
        />
      </main>
      <Alerts
        alert={alert}
        setAlert={setAlert}
      />
    </>
  )
}

export default App