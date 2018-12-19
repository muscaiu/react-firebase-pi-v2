import React, { Component } from 'react'
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from "reactstrap";
import * as authActions from 'actions/authActions';

class Modal extends Component {
    constructor(props) {
        super(props);
        const { show } = props;
        this.state = {
            open: show,
            password: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.show });
    }

    handleClose = (e) => {
        this.props.onClose(e);
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value })
    };

    handleLogin = () => {
        const { password } = this.state;
        const {
            fbLastAction,
            fbTotal,
            isActive,
            showNotification,
            mode,
            type
        } = this.props;
        const credentials = {
            email: 'admin@yahoo.com',
            password
        }
        const notify = (message, position, type) => showNotification(position, type, message)

        this.props.login(credentials, type === 'onoff' ? isActive : mode, fbLastAction, fbTotal, notify)
        this.setState({ password: '' })
        this.handleClose();
    };

    render() {
        const { type } = this.props;
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {type === 'mode' ? 'Need password to change mode' : 'Need password to change status'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="password"
                        type="password"
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
        )
    }
}

export default connect(null, authActions)(Modal);
