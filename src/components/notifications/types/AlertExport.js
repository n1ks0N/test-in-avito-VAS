import React from 'react'

const AlertExport = ({ text, style }) => {
    return (
        <div className="alert alert-secondary" style={style} role="alert">
            {text}
        </div>
    )
}

export default AlertExport