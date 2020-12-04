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
        <div>
            <label>{text}</label>
            <div>
                <ColorPicker
                    onChange={record}
                    onEndChange={record}
                    color={value}
                />
            </div>
        </div>
    )
}

export default InputColor