import React, { useRef, useState } from "react";
import { styled } from "styled-components";

const InputOuter = styled.div`
  display: flex;
  padding: 8px;
`;

const CountButton = styled.button`
  width: 48px;
  height: 48px;
  background: none;
  border: 2px solid #8cb6d4;
  border-radius: 4px;
  font-size: 24px;
  color: #8cb6d4;
  &:disabled {
    opacity: 0.3;
  }
`;
const Input = styled.input`
  width: 44px;
  height: 44px;
  padding: 0px;
  margin-left: 8px;
  margin-right: 8px;
  font-size: 16px;
  text-align: center;
  &:disabled {
    opacity: 0.3;
  }
`;

let timeoutId;
let intervalId;

//TODO: handle when user's type value is less than min or more than max

const CustomInputNumber = (props) => {
  const {
    min,
    max,
    step = 1,
    name,
    value: passedValue = 0,
    onChange: passedOnChange,
    onBlur: passedOnBlur,
    disabled,
  } = props;
  const [value, setValue] = useState(passedValue);
  const inputRef = useRef(null);

  const checkIsNumberValid = (prev, num) => {
    if (num > 0) {
      if (prev + num > max) {
        return false;
      }
    }
    if (num < 0) {
      if (prev + num < min) {
        return false;
      }
    }
    return true;
  };

  const onChange = (e) => {
    setValue(+e.target.value);
    passedOnChange?.(e);
  };

  const onBlur = (e) => {
    passedOnBlur?.(e);
  };

  const triggerInputChange = (num) => {
    const input = inputRef.current;
    if (!input) return;

    const lastValue = +input.value;
    if (!checkIsNumberValid(lastValue, num)) {
      onBtnMouseUpOrLeave();
      return;
    }

    input.value = +input.value + num;
    const event = new Event("input", { bubbles: true });
    const tracker = input._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
  };

  const onBtnMouseDown = (num) => {
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        triggerInputChange(num);
      }, 50);
    }, 300);
  };

  const onBtnMouseUpOrLeave = () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };

  return (
    <InputOuter>
      <CountButton
        onClick={() => triggerInputChange(step * -1)}
        onMouseDown={() => onBtnMouseDown(step * -1)}
        onMouseUp={onBtnMouseUpOrLeave}
        onMouseLeave={onBtnMouseUpOrLeave}
        disabled={disabled || value <= min}
      >
        -
      </CountButton>
      <Input
        ref={inputRef}
        name={name}
        type="number"
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={onBlur}
        min={min}
        max={max}
        disabled={disabled}
      />
      <CountButton
        onClick={() => triggerInputChange(step)}
        onMouseDown={() => onBtnMouseDown(step)}
        onMouseUp={onBtnMouseUpOrLeave}
        onMouseLeave={onBtnMouseUpOrLeave}
        disabled={disabled || value >= max}
      >
        +
      </CountButton>
    </InputOuter>
  );
};

export default CustomInputNumber;
