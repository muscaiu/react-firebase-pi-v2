import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Switch from '@material-ui/core/Switch';

import Modal from 'components/Modal/Modal';

const OnOff = styled.span`
  ${props => `color: ${props.color}`};
`;
const SwitchWrapper = styled.div`
  text-align: center;
  padding-bottom: 10px;
`;
const LogWrapper = styled.div`
`;
const Distance = styled.div`
  color: #7AC943;
`;
const AutoModeLog = styled.div`
  font-size: 13px;
  color: #BDBDBD;
`;

class OnOffSwitch extends Component {

  state = {
    showModal: false,
    dialogType: ''
  }

  getDistance = () => this.props.fbLastAction && moment(this.props.fbLastAction.toDate()).from();

  handleToggleModal = (toggle, title) => {
    this.setState(
      {
        showModal: toggle,
        dialogType: title
      }
    );
  }

  render() {
    const {
      isActive,
      mode,
      fbLastAction,
      fbTotal,
      showNotification
      // isEnabled
    } = this.props;
    const { showModal, dialogType } = this.state;

    return (
      <div>
        <SwitchWrapper>
          <OnOff color={mode === 'manual' ? '#7AC943' : '#BDBDBD'}>Manual</OnOff>
          <Switch
            checked={mode === 'auto'}
            onChange={() => this.handleToggleModal(true, 'mode')}
            value="mode"
            color="primary"
          />
          <OnOff color={mode === 'auto' ? '#7AC943' : '#BDBDBD'}>Auto</OnOff>
        </SwitchWrapper>

        <SwitchWrapper>
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

        <LogWrapper>
          <Distance>
            {isActive ? 'ON' : 'OFF'} since: {this.getDistance()}
          </Distance>
          <AutoModeLog>
            Auto interval : 19:00 - 20:00
          </AutoModeLog>
        </LogWrapper>

        <Modal
          type={dialogType}
          show={showModal}
          onClose={() => this.handleToggleModal(false)}
          showNotification={showNotification}
          fbLastAction={fbLastAction}
          fbTotal={fbTotal}
          isActive={isActive}
          mode={mode}
        />

      </div>
    );
  }
};

export default OnOffSwitch;
