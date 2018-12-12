import React, { Component } from 'react';
import axios from 'axios';

import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { API } from 'config/constants';

class LoginDialog extends Component {

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
    const {
      isActive,
      onOpdateState
    } = this.props;
    const { handleClose } = this;

    axios.post(`${API}/login`, { password })
      .then(function (response) {
        if (response.data.access) {
          axios.post(`${API}/light`, {
            status: !isActive
          })
            .then(function (response) { console.log(response.data) })
            .catch(function (error) { console.log(error) });

          onOpdateState({
            status: !isActive,
            lastAction: response.data.lastAction
          });
          handleClose();
        } else {
          handleClose();
        }
      })
      .catch(function (error) {
        console.log(error);
        handleClose();
      });
  };

  render() {
    const { isActive } = this.props;

    return (
      <div>
        <Switch
          checked={isActive}
          onChange={this.handleClickOpen}
          value="isActive"
          color="primary"
        />

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

export default LoginDialog;
