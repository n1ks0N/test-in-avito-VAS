import React from 'react'
import { ColorPicker } from 'react-color-gradient-picker'

const InputGradient = ({ text, value, name, change }) => {
    let colorValue
    if ("points" in value) { // если в value хранится linear (градиент, описываемый массивом points), то сохранить имеющееся значение, иначе заменить на linear
        colorValue = value
    } else {
        colorValue = {
            points: [
                {
                    left: 100,
                    red: value.red,
                    green: value.green,
                    blue: value.blue,
                    alpha: 1
                },
                {
                    left: 0,
                    red: value.red,
                    green: value.green,
                    blue: value.blue,
                    alpha: 1
                }
            ],
            degree: 0,
            type: 'linear'
        }
    }
    const record = (gradientAttrs) => {
        console.log(gradientAttrs)
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
                    gradient={colorValue}
                    isGradient
                />
            </div>
        </div>
    )
}

export default InputGradient