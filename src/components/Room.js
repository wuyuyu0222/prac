import React, { useEffect, useState } from 'react'
import CustomInputNumber from './CustomInputNumber'

const Room = (props) => {
    const { limit = 1, onChange } = props
    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(0)

    useEffect(() => {
        onChange({ adult, child })
    }, [adult, child])

    const onAdultChange = (e) => setAdult(+e.target.value)

    const onChildChange = (e) => setChild(+e.target.value)

    const guestNumber = adult + child
    return (
        <div>
            <p>房間：{guestNumber}人</p>
            <div>
                <span>大人</span>
                <span>年齡 20+</span>
                <CustomInputNumber value={adult} onChange={onAdultChange} max={limit - child} min={1} />
            </div>
            <div>
                <span>小孩</span>
                <CustomInputNumber value={child} onChange={onChildChange} max={limit - adult} min={0} />
            </div>
        </div>
    )
}

export default Room