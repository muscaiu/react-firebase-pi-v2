import React, { Component } from 'react';
import styled from 'styled-components';

import Logo from 'components/Logo';
import OnOffSwitch from './OnOffSwitch';
import pack from '../../package.json'

const Wrapper = styled.div`
  padding-top: 10px;
`;

const Version = styled.div`
  color: darkgrey;
  font-size: 8px;
  position: fixed;
  bottom: 10px;
`;

class Header extends Component {

  hanldeToggleMode = () => {
    this.props.toggleMode(this.props.fbMode);
  }

  hanldeToggleStats = () => {
    this.props.toggleStatus(this.props.fbStatus);
  }

  render() {
    const { fbStatus, fbMode, fbLastAction, showNotification } = this.props;

    return (
      <Wrapper>
        <Logo
          isActive={fbStatus}
          showNotification={showNotification}
        />
        <OnOffSwitch
          isActive={fbStatus}
          onStatusClick={this.hanldeToggleStats}
          fbLastAction={fbLastAction}
          mode={fbMode}
          showNotification={showNotification}
        />
        <Version>version: {pack.version}</Version>
      </Wrapper>
    )
  }
}

export default Header;
