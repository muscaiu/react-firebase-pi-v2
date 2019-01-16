import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

import logo from "assets/img/logo.svg";

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
  static propTypes = {
    isActive: PropTypes.bool,
    showNotification: PropTypes.func
  };

  handleTestClick = () => {
    const { showNotification } = this.props;

    axios.get('http://cassusa.go.ro:3001/api/test')
      .then(function (response) {
        showNotification('bc', 'success', `Real status: ${response.data.relayStatus}`)
      })
      .catch(function (err) {
        showNotification('bc', 'danger', `${err}`)
      })
  }

  render() {
    const { isActive } = this.props;
    return (
      <LogoImg
        onClick={this.handleTestClick}
        isActive={isActive}
        src={logo}
      />
    )
  }
}

export default Logo;
