import React from 'react'
import ButtonExport from './types/ButtonExport'
import ButtonReset from './types/ButtonReset'
import html2canvas from 'html2canvas'

const Buttons = ({ dispatch, setValueURL, notice, banner, banner: { width, height, text, bg, color, image, link } }) => {
  const exportPNG = () => {
    html2canvas(document.querySelector('.banner')).then(canvas => {
      const image = canvas.toDataURL()
      const a = document.createElement('A')
      a.href = image // eslint-disable-next-line
      a.download = image.substr(image.lastIndexOf('+') + 1).split(/[\=\$]/g)[0]
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
    notice('Сохранено')
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
              width: ${width}px;
              height: ${height}px;
              background: ${bg.style};
              color: ${color.style};
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
              overflow: hidden;
              line-height: 1.2em;
              max-height: 3.6em;
              text-align: center;  
            }
          </style>
          <script>
            document.querySelector('.banner').addEventListener('click', () => window.open('${link}', '_blank'))
          </script>
        `
    navigator.clipboard.writeText(html)
    notice('Скопировано')
  }

  const exportJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(banner))
    notice('Скопировано')
  }
  console.log(res)

  const reset = () => {
    console.log('RESET')
    dispatch({ type: 'EDIT-RESET' }) // editReducer
    // dispatch({ type: 'SELECT-RESET' }) // selectReducer
    // setValueURL(() => '')
    // notice('Сброшено')
  }
  return (
    <div className="panel__buttons">
      <ButtonExport
        text="Сохранить как PNG"
        click={exportPNG}
      />
      <ButtonExport
        text="Скопировать как HTML"
        click={exportHTML}
      />
      <ButtonExport
        text="Скопировать как JSON"
        click={exportJSON}
      />
      <ButtonReset
        click={reset}
      />
    </div>
  )
}

export default Buttons