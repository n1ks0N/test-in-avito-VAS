import React from 'react'
import { ColorPicker } from 'react-color-gradient-picker'

const InputColor = ({ text, value, name, change }) => {
    const record = (colorAttrs) => {
        change({
            param: colorAttrs,
            name: name
        })
    }
    return (
        <div className="panel__group__input-color">
            <label>{text}</label>
            <div>
                <ColorPicker
                    onStartChange={record}
                    onChange={record}
                    color={value}
                />
            </div>
        </div>
    )
}

export default InputColor