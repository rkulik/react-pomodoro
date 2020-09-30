import styled from '@emotion/styled';
import React from 'react';
import padTime from '../utils/pad-time';

const Time = styled.div`
  font-size: 100px;
  font-weight: bold;
  margin: 40px 0;
`;

const Timer = ({ time }: { time: number }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return (
    <Time>
      {padTime(minutes)} : {padTime(seconds)}
    </Time>
  );
};

export default Timer;
