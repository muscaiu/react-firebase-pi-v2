import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

import logo from "assets/img/logo.svg";

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

const LogoImg = styled.img`
  animation: ${props => props.isActive ? `${rotate360} infinite 20s linear` : 'null'};
  height: 150px;
`;

class Logo extends Component {
  handleTestClick = () => {
    const { showNotification } = this.props;
    const notify = (message, position, type) => showNotification(position, type, message)

    axios.get('http://cassusa.go.ro:3001/api/test')
      .then(function (response) {
        notify(`Real status: ${response.data.relayStatus}`, 'bc', 'success')
      })
      .catch(function (err) {
        alert();
        notify(`${err}`, 'bc', 'danger')
      })
  }

  render() {
    const { isActive } = this.props;
    return (
      <Wrapper>
        <LogoImg
          onClick={this.handleTestClick}
          isActive={isActive}
          src={logo}
        />
      </Wrapper>
    )
  }
}

export default Logo;
