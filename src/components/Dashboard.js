import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

import NotificationAlert from "react-notification-alert";
import { Row, Col } from "reactstrap";

import Header from 'components/Header/Header';
import Spinner from 'components/Header/Spinner';
import MultiChart from 'components/Charts/MultiChart';

class Dashboard extends React.Component {
  static proptypes = {
    fbStatus: PropTypes.bool.isRequired,
    fbMode: PropTypes.string.isRequired,
    fbLastAction: PropTypes.instanceOf(Date).isRequired
  }

  state = {
    bigChartData: "data1"
  };

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  showNotification = (place, type, message) => {
    // primary, success, dandger, warning, info
    const options = {
      place,
      message: (<div>{message}</div>),
      type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 5
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  render() {
    const { fbStatus, fbMode, fbLastAction, fbStatusList } = this.props;

    return (
      isLoaded(fbStatus) ?
        <Fragment>
          <div className="content">
            <Row>
              <Col xs="12">
                <Header
                  fbStatus={fbStatus}
                  fbMode={fbMode}
                  fbLastAction={fbLastAction}
                  showNotification={this.showNotification}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <MultiChart fbStatusList={fbStatusList} />
              </Col>
            </Row>
          </div>
          <NotificationAlert ref="notificationAlert" />
        </Fragment> :
        <Spinner />
    );
  }
}

function mapStateToProps(state) {
  const fbStatusList = state.firestore.ordered.status;
  const fbModeList = state.firestore.ordered.mode;
  return {
    fbStatus: fbStatusList && fbStatusList[0].value,
    fbMode: fbModeList && fbModeList[0].value,
    fbLastAction: fbStatusList && fbStatusList[0].createdAt,
    fbStatusList
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'status', orderBy: ['createdAt', 'desc'] },
    { collection: 'mode', limit: 1, orderBy: ['createdAt', 'desc'] }
  ])
)(Dashboard);