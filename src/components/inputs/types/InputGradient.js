import React, { useEffect } from 'react'
import { ColorPicker } from 'react-color-gradient-picker'
import reset from '../../../constants/reset'

const InputGradient = ({ text, value, name, change }) => {
    /* bag: решить проблему при переключении linear/solid */
    // useEffect(() => {
    //     if ("points" in value) {
    //         value = reset.bg
    //     }
    // }, [value])
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