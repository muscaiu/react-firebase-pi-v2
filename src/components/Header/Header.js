import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import classNames from "classnames";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import Logo from 'components/Header/Logo';
import OnOffSwitch from 'components/Header/OnOffSwitch';
import pack from '../../../package.json'
import Modal from 'components/Modals/Modal';

const Version = styled.div`
  color: darkgrey;
  font-size: 8px;
  position: fixed;
  bottom: 10px;
`;

const Distance = styled.div`
  color: #7AC943;
  font-size: 15px;
`;

class Header extends Component {
  static proptypes = {
    fbStatus: PropTypes.bool.isRequired,
    fbMode: PropTypes.string.isRequired,
    showNotification: PropTypes.func.isRequired,
    fbLastAction: PropTypes.object
  }

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

  getDistance = () => this.props.fbLastAction && moment(this.props.fbLastAction.toDate()).from();

  render() {
    const { fbStatus, fbMode, showNotification } = this.props;
    const { showModal, dialogType } = this.state;

    return (
      <Fragment>
        <Card className="card-chart">
          <CardHeader>
            <Row>
              <Col className="text-left" sm="6">
                <h5 className="card-category">Auto interval 21:00 - 22:00</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" />{" "}
                  {fbStatus ? 'ON' : 'OFF'}
                </CardTitle>
              </Col>
              <Col sm="6">
                <ButtonGroup
                  className="btn-group-toggle float-right"
                  data-toggle="buttons"
                >
                  <Button
                    color="info"
                    id="1"
                    size="sm"
                    tag="label"
                    className={classNames("btn-simple", {
                      active: fbMode === "auto"
                    })}
                    onClick={() => fbMode === 'manual' && this.handleToggleModal(true, 'mode')}
                  >
                    <span className="d-sm-block d-md-block d-lg-block d-xl-block">
                      Auto
                  </span>
                  </Button>
                  <Button
                    tag="label"
                    className={classNames("btn-simple", {
                      active: fbMode === "manual"
                    })}
                    color="info"
                    id="0"
                    size="sm"
                    onClick={() => fbMode === 'auto' && this.handleToggleModal(true, 'mode')}
                  >
                    <span className="d-sm-block d-md-block d-lg-block d-xl-block">
                      Manual
                  </span>
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div className="places-buttons">
              <Row>
                <Col className="ml-auto mr-auto text-center" md="6">
                  <Logo
                    isActive={fbStatus}
                    showNotification={showNotification}
                  />
                  <OnOffSwitch
                    isActive={fbStatus}
                    onStatusClick={this.hanldeToggleStats}
                    mode={fbMode}
                    showNotification={showNotification}
                  />
                  <Distance>
                    last action: {this.getDistance()}
                  </Distance>
                  <Version>version: {pack.version}</Version>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
        <Modal
          type={dialogType}
          show={showModal}
          onClose={() => this.handleToggleModal(false)}
          showNotification={showNotification}
          isActive={fbStatus}
          mode={fbMode}
        />
      </Fragment>
    )
  }
}

export default Header;
