import React, { ChangeEvent, FocusEvent, MouseEvent, useEffect, useRef, useState } from "react"
import styles from "./style/inputnumber.module.css"

function InputNumber({ ...settings }: IInputNumberProperty) {
    const clickIntervalRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const getInputValue = () => {
        return parseInt(inputRef.current.value);
    }

    const setInputValue = (inputNum: number) => {
        inputRef.current.value = inputNum.toString();
    }

    const setNativeValue = (element, value) => {
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(element, value);
        } else {
            valueSetter.call(element, value);
        }
    }

    const triggerChange = (newNum: number) => {
        setNativeValue(inputRef.current, newNum);
        inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }

    useEffect(() => {
        setInputValue(settings.value);

        return () => cancelInterval();
    }, []);

    useEffect(() => {
        let checkedNumber = checkNumber(getInputValue());

        setInputValue(checkedNumber);
    }, [settings.step, settings.min, settings.max]);

    const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("11");
        settings.onChange(e);
    }

    const reduce = (e: MouseEvent) => {
        let checkedNumber = checkNumber(getInputValue() - 1);

        triggerChange(checkedNumber);

        if (!clickIntervalRef.current) {
            clickIntervalRef.current = setInterval(() => {
                triggerChange(checkNumber(getInputValue() - 1));
            }, 100);
        }
    }

    const plus = (e: MouseEvent) => {
        let checkedNumber = checkNumber(getInputValue() + 1);

        triggerChange(checkedNumber);

        if (!clickIntervalRef.current) {
            clickIntervalRef.current = setInterval(() => {
                triggerChange(checkNumber(getInputValue() + 1));
            }, 100);
        }
    }

    const checkNumber = (inputNumber: number) => {
        if (inputNumber < settings.min) {
            inputNumber = settings.min;
        } else if (inputNumber > settings.max) {
            inputNumber = settings.max;
        }

        return inputNumber;
    }

    const cancelInterval = () => {
        if (clickIntervalRef.current) {
            clearInterval(clickIntervalRef.current);
            clickIntervalRef.current = null;
        }
    }

    return (
        <div className={styles.main}>
            <button
                onMouseDown={reduce}
                onMouseUp={cancelInterval}
            >-</button>
            <input type={"number"}
                ref={inputRef}
                step={settings.step}
                max={settings.max}
                min={settings.min}
                name={settings.name}
                onChange={onNumberChange}
                onBlur={settings.onBlur}
            />
            <button
                onMouseDown={plus}
                onMouseUp={cancelInterval}
            >+</button>
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