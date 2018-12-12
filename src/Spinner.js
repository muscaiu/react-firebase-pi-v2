import React from 'react';
import styled, { keyframes } from 'styled-components';

import logo from './logo.svg';

const Wrapper = styled.div`
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.img`
  animation: ${props => props.isActive ? `${rotate360} infinite 20s linear` : 'null'};
  height: 150px;
`;

const Spinner = ({ isActive }) => (
  <Wrapper>
    <Logo isActive={isActive} src={logo} />
  </Wrapper>
)

export default Spinner;
