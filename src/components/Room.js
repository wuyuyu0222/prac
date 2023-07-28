import React, { useEffect, useState } from "react";
import CustomInputNumber from "./CustomInputNumber";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Title = styled.p`
  margin-bottom: 16px;
  font-size: 18px;
`;
const Section = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const DescContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Desc = styled.span`
  margin-bottom: 4px;
`;

const SubDesc = styled.span`
  color: #bbb;
`;

const Room = (props) => {
  const { limit = 1, remainGuest, onChange, disabled } = props;
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);

  useEffect(() => {
    onChange?.({ adult, child });
  }, [adult, child]);

  const onAdultChange = (e) => setAdult(+e.target.value);

  const onChildChange = (e) => setChild(+e.target.value);

  const guestNumber = adult + child;
  const canIncrease = remainGuest > 0;
  return (
    <Container>
      <Title>房間：{guestNumber} 人</Title>
      <Section>
        <DescContainer>
          <Desc>大人</Desc>
          <SubDesc>年齡 20+</SubDesc>
        </DescContainer>
        <CustomInputNumber
          value={adult}
          onChange={onAdultChange}
          max={canIncrease ? limit - child : adult}
          min={1}
          disabled={disabled}
        />
      </Section>
      <Section>
        <Desc>小孩</Desc>
        <CustomInputNumber
          value={child}
          onChange={onChildChange}
          max={canIncrease ? limit - adult : child}
          min={0}
          disabled={disabled}
        />
      </Section>
    </Container>
  );
};

export default Room;
