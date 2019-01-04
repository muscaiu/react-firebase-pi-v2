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

const AutoManual = styled.span`
  ${props => `color: ${props.color}`};
`;

class LoginDialog extends Component {
  state = {
    open: false,
    password: ''
  };

  handleUpdatePassword = (e) => {
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
    const credentials = {
      email: 'admin@yahoo.com',
      password
    }

    this.props.login(credentials, this.props.mode)
    this.setState({ password: '' })
    this.handleClose();
  };

  render() {
    const { mode } = this.props;
    return (
      <div>
        <AutoManual color={mode === 'manual' ? '#7AC943' : '#BDBDBD'}>Manual</AutoManual>
        <Switch
          checked={mode === 'auto'}
          onChange={this.handleClickOpen}
          value="mode"
          color="primary"
        />
        <AutoManual color={mode === 'auto' ? '#7AC943' : '#BDBDBD'}>Auto</AutoManual>
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
              onChange={this.handleUpdatePassword}
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

export default connect(null, authActions)(LoginDialog);
