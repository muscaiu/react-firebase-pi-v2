import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
  static propTypes = {
    isActive: PropTypes.bool,
    mode: PropTypes.string,
    showNotification: PropTypes.func
  };

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
    const { isActive, mode, showNotification } = this.props;
    const { showModal, dialogType } = this.state;

    return (
      <Fragment>
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
          isActive={isActive}
          mode={mode}
        />
      </Fragment>
    );
  }
};

export default OnOffSwitch;