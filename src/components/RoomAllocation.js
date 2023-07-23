import React, { useCallback, useEffect, useState } from 'react'
import Room from './Room'

const getUniqueId = () => Math.random().toString(36).substring(2)

const getRoomMap = (room) => {
    const roomMap = {}
    for (let i = 0; i < room; i++) {
        roomMap[getUniqueId()] = { adult: 1, child: 0 }
    }
    return roomMap
}

const RoomAllocation = (props) => {
    const { guest = 0, room = 0 } = props
    const [roomMap, setRoomMap] = useState({})
    const [remainGuest, setRemainGuest] = useState(guest)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        const currentRoomMap = getRoomMap(room)
        setRoomMap(currentRoomMap)
    }, [room])

    useEffect(() => {
        if (guest === room) setDisabled(true)
        else setDisabled(false)
    }, [guest, room])

    const onRoomChange = (id, result) => {
        roomMap[id] = result
        const currentGuest = Object.values(roomMap).reduce((prev, curr) => {
            const count = curr.adult + curr.child
            return prev + count
        }, 0)
        setRemainGuest(guest - currentGuest)
    }

    return (
        <div>
            <p>住客人數：{guest}人 / {room}房</p>
            <div>
                <span>尚未分配人數：{remainGuest}人</span>
            </div>
            {Object.keys(roomMap).map(key => {
                if (!key) return null
                return (
                    <Room
                        key={key}
                        limit={4}
                        remainGuest={remainGuest}
                        onChange={(result) => onRoomChange(key, result)}
                        disabled={disabled}
                    />
                )
            })}
        </div>
    )
}

export default RoomAllocation