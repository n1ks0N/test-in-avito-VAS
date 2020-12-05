import React from 'react'
import Select from './types/Select'
import InputGradient from './types/InputGradient'
import InputColor from './types/InputColor'
import InputText from './types/InputText'
import Textarea from './types/Textarea'
import InputFile from './types/InputFile'
import './Inputs.css'

const Inputs = ({ resize, change, valueURL, setValueURL, state: { select, banner: { bg, text, color, image, link } } }) => {
    const sizeReader = ({ param }) => {
        change({ // editReducer
            param: param.split(' ')[0],
            name: 'width'
        })
        change({ // editReducer
            param: param.split(' ')[2],
            name: 'height'
        })
        resize({ // selectReducer
            param: param
        })
    }

    const fileReader = ({ param }) => {
        if (param) {
            const reader = new FileReader()
            reader.readAsDataURL(param)
            reader.onload = () => {
                if (reader.result !== valueURL && reader.result !== image) {
                    setValueURL(() => '') // image-input
                    change({ // editReducer
                        param: reader.result,
                        name: 'image'
                    })
                }
            }
        }
    }

    const urlReader = ({ param }) => {
        setValueURL(() => param) // image-input
        if (param !== image && param !== '') {
            change({ // editReducer
                param: param,
                name: 'image'
            })
        }
    }
    return (
        <>
            <div className="panel__group">
                <Select
                    text="Ширина x Высота"
                    name="size"
                    change={sizeReader}
                    value={select}
                />
            </div>

            <div className="panel__group panel__double-input panel__group-color">
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

            <div className="panel__group">
                <label htmlFor="panel-image">
                    Изображение<br />
                    <span>Вставьте URL картинки или загрузите с компьютера</span>
                </label>
                <div className="panel__double-input" id="panel-image">
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
                    <div className="input-group">
                        <InputFile
                            text="Выберите изображение"
                            name="image"
                            accept="image/*"
                            change={fileReader}
                        />
                    </div>
                </div>
            </div>
            <div className="panel__group">
                <Textarea
                    text="Текстовое содержание"
                    type="text"
                    value={text}
                    name="text"
                    placeholder="Введите текст"
                    change={change}
                />
            </div>
            <div className="panel__group">
                <InputText
                    text="Ссылка в объявлении"
                    type="url"
                    value={link}
                    name="link"
                    placeholder="https://"
                    change={change}
                />
            </div>
        </>
    )
}

export default Inputs