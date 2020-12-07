import React from 'react'
import { ColorPicker } from 'react-color-gradient-picker'

const InputColor = ({ text, value, name, change }) => {
    let colorValue
    if ("points" in value) { // если в value хранится linear (градиент, описываемый массивом points), то заменить на solid (однотонный цвет), иначе сохранить имеющееся значение 
        colorValue = {
            alpha: 1,
            red: value.points[0].red,
            green: value.points[0].green,
            blue: value.points[0].blue
        }
    } else {
        colorValue = value
    }
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
                    color={colorValue}
                />
            </div>
        </div>
    )
}

export default InputColor