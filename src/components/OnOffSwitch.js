import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as authActions from '../actions/authActions';

const OnOff = styled.span`
  ${props => `color: ${props.color}`};
`;

class OnOffSwitch extends Component {

  state = {
    open: false,
    password: ''
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogin = () => {
    const { password } = this.state;
    const { fbLastAction, fbTotal } = this.props;
    const credentials = {
      email: 'admin@yahoo.com',
      password
    }

    this.props.login(credentials, this.props.isActive, fbLastAction, fbTotal)
    this.setState({ password: '' })
    this.handleClose();
  };

  render() {
    const { isActive, isEnabled } = this.props;

    return (
      <div>
        <OnOff color={isActive ? '#BDBDBD' : '#7AC943'}>Off</OnOff>
        <Switch
          disabled={isEnabled}
          checked={isActive}
          onChange={this.handleClickOpen}
          value="isActive"
          color="primary"
        />
        <OnOff color={isActive ? '#7AC943' : '#BDBDBD'}>On</OnOff>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">needs the password</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="password"
              type="text"
              fullWidth
              onChange={this.handlePasswordChange}
              onKeyPress={(ev) => ev.key === 'Enter' && this.handleLogin()}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export default connect(null, authActions)(OnOffSwitch);