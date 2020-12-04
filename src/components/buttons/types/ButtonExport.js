import React from 'react'

const ButtonExport = ({ text, click }) => {
    return (
        <button type="button" className="btn btn-outline-dark panel__buttons__btn" onClick={click}>{text}</button>
    )
}

export default ButtonExport