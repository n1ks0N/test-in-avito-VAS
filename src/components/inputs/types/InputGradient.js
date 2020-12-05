import React from 'react'
import { ColorPicker } from 'react-color-gradient-picker'

const InputGradient = ({ text, value, name, change }) => {
    const record = (gradientAttrs) => {
        change({
            param: gradientAttrs,
            name: name
        })
    }
    return (
        <div className="panel__group__input-color">
            <label>{text}</label>
            <div>
                <ColorPicker
                    onChange={record}
                    onEndChange={record}
                    gradient={value}
                    isGradient
                />
            </div>
        </div>
    )
}

export default InputGradient