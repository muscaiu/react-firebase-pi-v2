import React, { Component } from 'react';
import styled from 'styled-components';

import Switch from '@material-ui/core/Switch';

import Modal from 'components/Modals/Modal';

const OnOff = styled.span`
  ${props => `color: ${props.color}`};
`;
const SwitchWrapper = styled.div`
  text-align: center;
`;

class OnOffSwitch extends Component {

  state = {
    showModal: false,
    dialogType: ''
  }

  handleToggleModal = (toggle, title) => {
    this.setState(
      {
        showModal: toggle,
        dialogType: title
      }
    );
  }

  handleNotifyDisabled = () => {
    const { showNotification, mode } = this.props;
    if (mode === 'auto') {
      showNotification('bc', 'warning', 'Disabled in Auto Mode')
    }
  }

  render() {
    const {
      isActive,
      mode,
      showNotification,
      fbLastAction
    } = this.props;
    const { showModal, dialogType } = this.state;

    return (
      <div>
        {/* 
        <SwitchWrapper>
          <OnOff color={mode === 'manual' ? '#7AC943' : '#BDBDBD'}>Manual</OnOff>
          <Switch
            checked={mode === 'auto'}
            onChange={() => this.handleToggleModal(true, 'mode')}
            value="mode"
            color="primary"
          />
          <OnOff color={mode === 'auto' ? '#7AC943' : '#BDBDBD'}>Auto</OnOff>
        </SwitchWrapper>*/}
        <SwitchWrapper
          onClick={this.handleNotifyDisabled}>
          <OnOff color={isActive ? '#BDBDBD' : '#7AC943'}>Off</OnOff>
          <Switch
            disabled={mode === 'auto'}
            checked={isActive}
            onChange={() => this.handleToggleModal(true, 'onoff')}
            value="isActive"
            color="primary"
          />
          <OnOff color={isActive ? '#7AC943' : '#BDBDBD'}>On</OnOff>
        </SwitchWrapper>

        <Modal
          type={dialogType}
          show={showModal}
          onClose={() => this.handleToggleModal(false)}
          showNotification={showNotification}
          fbLastAction={fbLastAction}
          isActive={isActive}
          mode={mode}
        />

      </div>
    );
  }
};

export default OnOffSwitch;
