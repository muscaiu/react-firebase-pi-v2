import React from 'react';
import styled from 'styled-components';
import moment from 'moment'

const Wrapper = styled.div`
  padding-top: 40px;
`;
const Distance = styled.div`
  color: #7AC943;
`;
const AutoModeLog = styled.div`
  padding-top: 20px;
  font-size: 13px;
  color: #BDBDBD;
`

const getDistance = (lastAction) => moment(lastAction.toDate()).from();

const Log = ({ isActive, lastAction }) => {
  return (
    lastAction ?
      <Wrapper>
        <Distance>
          {isActive ? 'ON' : 'OFF'} since: {getDistance(lastAction)}
        </Distance>
        <AutoModeLog>
          Auto interval : 19:00 - 20:00
          </AutoModeLog>
      </Wrapper> :
      null
  )
};

export default Log;
