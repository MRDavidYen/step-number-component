import React, { ChangeEvent, FocusEvent, MouseEvent, useEffect, useRef, useState } from "react"
import styles from "./style/inputnumber.module.css"

function InputNumber({ ...settings }: IInputNumberProperty) {
    const [numberVal, setNumberVal] = useState(settings.value);
    const clickIntervalRef = useRef(null);

    useEffect(() => {
        checkNumber(numberVal);
    }, [settings.step, settings.min, settings.max]);

    const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputNumber = parseInt(e.target.value);

        if (inputNumber) {
            checkNumber(inputNumber);
        }

        settings.onChange(e);
    }

    const reduce = (e: MouseEvent) => {
        checkNumber(numberVal - 1);
    }

    const plus = (e: MouseEvent) => {
        checkNumber(numberVal + 1);
    }

    const checkNumber = (inputNumber: number) => {
        if (inputNumber < settings.min) {
            setNumberVal(settings.min);
        } else if (inputNumber > settings.max) {
            setNumberVal(settings.max);
        } else {
            setNumberVal(inputNumber);
        }
    }

    return (
        <div className={styles.main}>
            <button onMouseDown={reduce}>-</button>
            <input type={"number"}
                step={settings.step}
                max={settings.max}
                min={settings.min}
                value={numberVal}
                name={settings.name}
                onChange={onNumberChange}
                onBlur={settings.onBlur}
            />
            <button onMouseDown={plus}>+</button>
        </div>
    )
}

export default InputNumber

interface IInputNumberProperty {
    min: number,
    max: number,
    step: number,
    name: string,
    value: number,
    disabled: boolean,
    onChange: (e: ChangeEvent) => void,
    onBlur: (e: FocusEvent) => void
}