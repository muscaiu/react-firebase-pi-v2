import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import Switch from '@material-ui/core/Switch';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Label,
  Row,
  Col
} from "reactstrap";

import * as authActions from '../actions/authActions';

const OnOff = styled.span`
  ${props => `color: ${props.color}`};
`;

const SwitchWrapper = styled.div`
  text-align: center;
`;
const Distance = styled.div`
  color: #7AC943;
`;
const AutoModeLog = styled.div`
  font-size: 13px;
  color: #BDBDBD;
`

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
    const { fbLastAction, fbTotal, mode } = this.props;
    const credentials = {
      email: 'admin@yahoo.com',
      password
    }

    this.props.login(credentials, this.props.isActive, fbLastAction, fbTotal)
    this.setState({ password: '' })
    this.handleClose();
  };

  getDistance = () => this.props.fbLastAction && moment(this.props.fbLastAction.toDate()).from();

  render() {
    const { isActive, isEnabled, mode } = this.props;

    return (
      <div>
        <SwitchWrapper>
          <OnOff color={mode === 'manual' ? '#7AC943' : '#BDBDBD'}>Manual</OnOff>
          <Switch
            checked={mode === 'auto'}
            onChange={this.handleClickOpen}
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
            onChange={this.handleClickOpen}
            value="isActive"
            color="primary"
          />
          <OnOff color={isActive ? '#7AC943' : '#BDBDBD'}>On</OnOff>
        </SwitchWrapper>
        <Card>
          <CardBody>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <CardTitle tag="h4">
                  <Distance>
                    {isActive ? 'ON' : 'OFF'} since: {this.getDistance()}
                  </Distance>
                  <AutoModeLog>
                    Auto interval : 19:00 - 20:00
                  </AutoModeLog>
                </CardTitle>
              </Col>
            </Row>
          </CardBody>
        </Card>

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