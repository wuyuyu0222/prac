import React, { useRef, useState } from 'react'

let timeoutId;
let intervalId;

const CustomInputNumber = (props) => {
    const { min = 0, max = 10, step = 1,
        name, value: passedValue = 0, onChange: passedOnChange, onBlur: passedOnBlur, disabled } = props;
    const [value, setValue] = useState(passedValue)
    const inputRef = useRef(null)

    const checkIsNumberValid = (prev, num) => {
        console.log(prev, num)
        if (num > 0) {
            if (prev + num > max) {
                return false
            }
        }
        if (num < 0) {
            if (prev + num < min) {
                return false
            }
        }
        return true
    }

    const onChange = (e) => {
        setValue(+e.target.value)
        passedOnChange?.(e)
    }

    const onBlur = (e) => {
        passedOnBlur?.(e)
    }

    const triggerInputChange = (num) => {
        const input = inputRef.current
        if (!input) return

        const lastValue = +input.value;
        if (!checkIsNumberValid(lastValue, num)) {
            onBtnUpOrLeave()
            return
        }

        input.value = +input.value + num;
        const event = new Event("input", { bubbles: true });
        const tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
    }

    const onBtnMouseDown = (num) => {
        timeoutId = setTimeout(() => {
            intervalId = setInterval(() => {
                triggerInputChange(num)
            }, 300)
        }, 300)
    }

    const onBtnUpOrLeave = () => {
        clearTimeout(timeoutId)
        clearInterval(intervalId)
    }

    return <div className='inputOuter'>
        <button
            className='inputButton'
            onClick={() => triggerInputChange(step * -1)}
            onMouseDown={() => onBtnMouseDown(step * -1)}
            onMouseUp={onBtnUpOrLeave}
            onMouseLeave={onBtnUpOrLeave}
            disabled={disabled || value === min}
        >-</button>
        <input
            ref={inputRef}
            name={name}
            type="number"
            className='numberInput'
            value={value}
            onChange={(e) => onChange(e)}
            onBlur={onBlur}
            min={min}
            max={max}
            disabled={disabled}
        />
        <button className='inputButton'
            onClick={() => triggerInputChange(step)}
            onMouseDown={() => onBtnMouseDown(step)}
            onMouseUp={onBtnUpOrLeave}
            onMouseLeave={onBtnUpOrLeave}
            disabled={disabled || value === max}
        >+</button>
    </div>
}

export default CustomInputNumber