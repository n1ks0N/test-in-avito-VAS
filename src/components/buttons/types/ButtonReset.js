import React from 'react'
import resetImage from '../../../assets/reset.png'

const ButtonReset = ({ click }) => {
    return (
        <button type="button" className="btn btn-light" onClick={click}><img src={resetImage} className="panel__buttons__image_size" alt="reset" /></button>
    ) // to SVG
}

export default ButtonReset