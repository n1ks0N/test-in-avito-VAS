import React from 'react'
import './Banner.css'

const Banner = ({ banner: { width, height, bg, color, text, image } }) => {
    const style = {
        width: `${width}px`,
        height: `${height}px`,
        background: `${bg.style}`,
        color: `${color.style}`,
        wrapper: {
            backgroundImage: `url('${image}')`,
        }
    }
    return (
        <div>
            <h3>Результат</h3>
            <div className="banner" style={style}>
                <div className="banner__wrapper" style={style.wrapper}>
                    <p className="banner__text">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default Banner