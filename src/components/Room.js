import React, { useEffect, useState } from 'react'
import CustomInputNumber from './CustomInputNumber'

const Room = (props) => {
    const { limit = 1, remainGuest, onChange, disabled } = props
    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(0)

    useEffect(() => {
        onChange?.({ adult, child })
    }, [adult, child])

    const onAdultChange = (e) => setAdult(+e.target.value)

    const onChildChange = (e) => setChild(+e.target.value)

    const guestNumber = adult + child
    const canIncrease = remainGuest > 0
    return (
        <div>
            <p>房間：{guestNumber}人</p>
            <div>
                <span>大人</span>
                <span>年齡 20+</span>
                <CustomInputNumber
                    value={adult}
                    onChange={onAdultChange}
                    max={canIncrease ? limit - child : adult}
                    min={1}
                    disabled={disabled}
                />
            </div>
            <div>
                <span>小孩</span>
                <CustomInputNumber
                    value={child}
                    onChange={onChildChange}
                    max={canIncrease ? limit - adult : child}
                    min={0}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

export default Room