import React, { useRef } from 'react'

const Select = ({ text, name, value, change, className }) => {
    const inputRef = useRef(value)
    const record = () => {
        change({
            param: inputRef.current.value
        })
    }
    return (
        <div>
            <label htmlFor={name}>{text}</label>
            <select className={`custom-select ${className}`} id={name} ref={inputRef} value={value[0]} onChange={record}>
                {value.map(data => <option value={data} key={data}>{data}</option>)}
            </select>
        </div>
    )
}

export default Select