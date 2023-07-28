import React, { useEffect, useState } from "react";
import Room from "./Room";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 16px;
`;

const Title = styled.p`
  margin-bottom: 16px;
  font-size: 18px;
`;

const DescContainer = styled.div`
  margin: 8px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 24px;
  padding-bottom: 24px;
  background-color: #f3fdff;
  border: 1px solid #eaf0fa;
  border-radius: 4px;
`;

const Desc = styled.span`
  color: #666;
`;

const Divider = styled.hr`
  margin: auto;
  width: 80%;
`;

const getUniqueId = () => Math.random().toString(36).substring(2);

const RoomAllocation = (props) => {
  const { guest = 0, room = 0 } = props;
  const [roomList, setRoomList] = useState([]);
  const [remainGuest, setRemainGuest] = useState(guest);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let currentRoomList = Array(room).fill(undefined);
    currentRoomList = currentRoomList.map((_) => ({
      id: getUniqueId(),
      adult: 1,
      child: 0,
    }));
    setRoomList(currentRoomList);
  }, [room, setRoomList]);

  useEffect(() => {
    if (guest === room) setDisabled(true);
    else setDisabled(false);
  }, [guest, room]);

  useEffect(() => {
    const currentGuest = roomList.reduce((prev, curr) => {
      const count = curr.adult + curr.child;
      return prev + count;
    }, 0);
    setRemainGuest(guest - currentGuest);
  }, [guest, roomList, setRemainGuest]);

  const onRoomChange = (id, result) => {
    setRoomList((prev) => {
      const roomIndex = prev.findIndex((room) => room.id === id);
      roomList[roomIndex] = {id, ...result}
      return [...prev];
    });
  };

  return (
    <Container>
      <Title>
        住客人數：{guest}人 / {room}房
      </Title>
      <DescContainer>
        <Desc>尚未分配人數：{remainGuest}人</Desc>
      </DescContainer>
      {roomList.map((room, index, array) => {
        if (!room) return null;
        return (
          <div key={room.id}>
            <Room
              limit={4}
              remainGuest={remainGuest}
              onChange={(result) => onRoomChange(room.id, result)}
              disabled={disabled}
            />
            {index !== array.length - 1 ? <Divider /> : null}
          </div>
        );
      })}
    </Container>
  );
};

export default RoomAllocation;
