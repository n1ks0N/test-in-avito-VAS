import React from 'react'
import Select from './types/Select'
import InputGradient from './types/InputGradient'
import InputColor from './types/InputColor'
import InputText from './types/InputText'
import Textarea from './types/Textarea'
import InputFile from './types/InputFile'

const Inputs = ({ dispatch, change, valueURL, setValueURL, state: { select, banner: { bg, text, color, image, link } } }) => {
    const sizeReader = ({ param }) => {
        dispatch({ // editReducer
            type: 'EDIT-SELECT',
            width: param.split(' ')[0],
            height: param.split(' ')[2],
        })
        dispatch({ // selectReducer
            type: 'SELECT-CHANGE',
            size: param
        })
    }
    const fileReader = ({ param }) => {
        if (param) {
            const reader = new FileReader()
            reader.readAsDataURL(param)
            reader.onload = () => {
                if (reader.result !== valueURL && reader.result !== image) {
                    setValueURL(() => '')
                    change({
                        param: reader.result,
                        name: 'image'
                    })
                }
            }
        }
    }
    const urlReader = ({ param }) => {
        setValueURL(() => param)
        if (param !== image && param !== '') {
            change({
                param: param,
                name: 'image'
            })
        }
    }
    return (
        <>
            <Select
                text="Ширина x Высота"
                name="size"
                change={sizeReader}
                value={select}
            />

            <div className="panel__color-picker">
                <InputGradient
                    text="Фоновый цвет"
                    value={bg}
                    name="bg"
                    change={change}
                />
                <InputColor
                    text="Цвет текста"
                    value={color}
                    name="color"
                    change={change}
                />
            </div>

            <label htmlFor="panel-image">
                Изображение<br />
                <span>Вставьте URL картинки или загрузите с компьютера</span>
            </label>
            <div className="panel__image" id="panel-image">
                <div>
                    <div className="input-group">
                        <InputText
                            text=""
                            type="url"
                            value={valueURL}
                            name="image"
                            placeholder="https://"
                            change={urlReader}
                        />
                    </div>
                </div>
                <div>
                    <InputFile
                        text="Выберите изображение"
                        name="image"
                        accept="image/*"
                        change={fileReader}
                    />
                </div>
            </div>
            <Textarea
                text="Текстовое содержание"
                type="text"
                value={text}
                name="text"
                placeholder="Введите текст"
                change={change}
            />
            <InputText
                text="Ссылка в объявлении"
                type="url"
                value={link}
                name="link"
                placeholder="https://"
                change={change}
            />
        </>
    )
}

export default Inputs