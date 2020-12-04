import React from 'react'

const Banner = ({ text, image, change, banner: { width, height, bg, color } }) => {
    const style = {
        width: `${width}px`,
        height: `${height}px`,
        background: `${bg.style}`,
        color: `${color.style}`,
        img: {
            maxWidth: `${width}px`,
            maxHeight: `${height}px`
        }
    }
    const imageError = () => {
        change({
            param: '',
            name: 'image'
        })
    }
    return (
        <div>
            <h3>Результат</h3>
            <div className="banner" style={style}>
                <p className="banner__text" style={style.text}>{text}</p>
                {image !== '' ? <img src={image} className="banner__img" style={style.img} alt="banner" align="center" onError={imageError} /> : <></>}
            </div>
        </div>
    )
}

export default Banner