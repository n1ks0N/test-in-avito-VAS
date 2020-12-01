import React, { useMemo, useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

const App = ({ dispatch, state: { select, banner, banner: { width, height, bg, text, color, image, link } } }) => {

  const [valueURL, setValueURL] = useState('') // для input-image

  const sizeRef = useRef(null)
  const bgRef = useRef(bg)
  const imageRef = useRef('')
  const imageReaderRef = useRef(null)
  const textRef = useRef(text)
  const colorRef = useRef(color)
  const linkRef = useRef(link)

  const widthHeight = useEffect(() => {
    if (width < 200 && height > 500) {
      console.log(18)
      return 18
    } else if (200 < width < 300 && 300 < height < 500) {
      console.log(20)
      return 20
    }
  }, [width, height])

  const style = {
    width: `${width}px`,
    height: `${height}px`,
    background: `${bg}`,
    color: `${color}`,
    img: {
      maxWidth: `${width}px`,
      maxHeight: `${height}px`
    }
  }

  const exportPNG = () => {
    copied(0)
  }

  const exportHTML = () => {
    const html = `
      <div class="banner">
        <p class="banner__text">${text}</p>
        <img class="banner__img" alt="banner" align="center" src="${image}">
      </div>
      <style>
        .banner {
          position: relative;
          text-align: center;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 25px;
          width: ${width}px;
          height: ${height}px;
          background: ${bg};
          color: ${color};
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }
        .banner__img {
          position: absolute;
          bottom: 0;
          right: 0;
          max-width: ${width}px;
          max-height: ${height}px;
        }
        .banner__text {
          width: 100%;
          margin: 0;
          z-index: 1;
        }
      </style>
      <script>
        document.querySelector('.banner').addEventListener('click', () => window.open('${link}', '_blank'))
      </script>
    `
    navigator.clipboard.writeText(html)
    copied(1)
  }

  const exportJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(banner))
    copied(1)
  }

  const res = () => {
    dispatch({ type: 'RESET' }) // editReducer
    dispatch({ type: 'SELECT-RESET' }) // selectReducer
    setValueURL(() => '')
  }
  
  // copied -> alertStyle -> useEffect[alert] — для вывода уведомления
  const [alert, setAlert] = useState({ show: false, text: '' }) // отображение alert: true/false, текст для alert: 'сохранено', 'скопировано' 

  const copied = (id) => {
    setAlert(prev => {
      return {
        show: !prev.show,
        text: id === 0 ? 'Сохранено' : 'Скопировано'
      }
    })
  }

  const alertStyle = useMemo(() => ({
      display: alert.show ? 'block' : 'none'
  }), [alert])

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => { // спрятать alert через 3 секунды
        setAlert(prev => {
          return {
            ...prev,
            show: !prev.show
          }
        })
      }, 3000)
    }
  }, [alert])

  const record = (base) => {
    dispatch({ // editReducer
      type: 'CHANGE',
      width: sizeRef.current.value.split(' ')[0],
      height: sizeRef.current.value.split(' ')[2],
      bg: bgRef.current.value,
      text: textRef.current.value,
      color: colorRef.current.value,
      image: typeof (base) === 'string' ? base : image,
      link: `${linkRef.current.value}`
    })
    dispatch({ // selectReducer
      type: 'SELECT',
      size: sizeRef.current.value
    })
  }

  const readerFile = () => {
    const blob = imageReaderRef.current.files[0]
    if (blob) {
      console.log(blob)
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = function () {
        const value = imageRef.current.value
        if (reader.result !== value && reader.result !== image) {
          setValueURL(() => '')
          record(reader.result)
        }
      }
    }
  }

  const readerURL = () => {
    const value = imageRef.current.value
    setValueURL(() => value)
    if (value !== image && value !== '') {
      record(value)
    }
  }

  console.log('render')

  return (
    <>
      <h1 align="center">Редактор баннеров</h1>
      <main>
        <div className="panel">
          <h3>Панель управления</h3>
          <label htmlFor="custom-select">Ширина x Высота</label>
          <select className="custom-select" id="custom-select" ref={sizeRef} value={select[0]} onChange={record}>
            {select.map(text => <option value={`${text}`} key={`${text}`}>{text}</option>)}
          </select>

          <label htmlFor="bg">Фоновый цвет</label>
          <div className="input-group">
            <input type="color" className="form-control" id="bg" placeholder="HEX" aria-label="bg" aria-describedby="addon2" ref={bgRef} value={bg} onChange={record} />
          </div>

          <label htmlFor="panel-image">
            Изображение<br/>
            <span>Вставьте URL картинки или загрузите с компьютера</span>
          </label>
          <div className="panel__image" id="panel-image">
            <div>
              <div className="input-group">
                <input type="url" className="form-control" id="image" placeholder="https://" aria-label="image" aria-describedby="addon3" ref={imageRef} value={valueURL} onChange={readerURL} />
              </div>
            </div>
            <div>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" accept="image/*" ref={imageReaderRef} onChange={readerFile} />
                <label className="custom-file-label" htmlFor="customFile">Выберите изображение</label>
              </div>
            </div>
          </div>

          <label htmlFor="text">Текстовое содержание</label>
          <div className="input-group">
            <textarea type="text" className="form-control" id="text" placeholder="Введите текст" aria-describedby="addon4" ref={textRef} value={text} onChange={record}></textarea>
          </div>

          <label htmlFor="color">Цвет текста</label>
          <div className="input-group">
            <input type="color" className="form-control" id="color" placeholder="HEX" aria-label="color" aria-describedby="addon5" ref={colorRef} value={color} onChange={record} />
          </div>

          <label htmlFor="link">Ссылка в объявлении</label>
          <div className="input-group">
            <input type="url" className="form-control" id="link" placeholder="https://" aria-label="link" aria-describedby="addon5" ref={linkRef} value={link} onChange={record} />
          </div>

          <br />

          <div className="panel__buttons">
            <button type="button" className="btn btn-dark panel__buttons__btn" onClick={exportPNG}>Сохранить как PNG</button>
            <button type="button" className="btn btn-dark panel__buttons__btn" onClick={exportHTML}>Скопировать как HTML</button>
            <button type="button" className="btn btn-dark panel__buttons__btn" onClick={exportJSON}>Скопировать как JSON</button>
            <button type="button" className="btn btn-dark" onClick={res}>Reset</button>
          </div>
        </div>
        <div>
          <h3>Результат</h3>
          <div className="banner" style={style}>
            <p className="banner__text" style={style.text}>{text}</p>
            {image !== '' ? <img src={image} className="banner__img" style={style.img} alt="banner" align="center" /> : <></>}
          </div>
        </div>
      </main>
      <div className="alert alert-secondary" style={alertStyle} role="alert">
        {alert.text}
      </div>
    </>
  )
}

export default App