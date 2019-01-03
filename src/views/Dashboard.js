import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

import NotificationAlert from "react-notification-alert";
import {
  Card,
  // CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import Header from 'components/Header';
import LineChart from 'components/Charts/LineChart';
// import MultiChart from 'components/Charts/MultiChart';
import Spinner from 'components/Spinner';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  showNotification = (place, type, message) => {
    // primary, success, dandger, warning, info

    var options = {};
    options = {
      place,
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 3
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  isLoad = () => {
    setTimeout(() => {
      console.log('dickhead')
    }, 5000)
  }

  render() {
    const { fbStatus, fbMode, fbLastAction, fbStatusList } = this.props;

    return (
      isLoaded(fbStatus) ?
        <Fragment>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardBody>
                    <div className="places-buttons">
                      <Row>
                        <Col className="ml-auto mr-auto text-center" md="6">
                          <CardTitle tag="h4">
                            <Header
                              fbStatus={fbStatus}
                              fbMode={fbMode}
                              fbLastAction={fbLastAction}
                              showNotification={this.showNotification} 
                            />
                          </CardTitle>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <LineChart fbStatusList={fbStatusList} />
              </Col>
            </Row>
            {/* <Row>
            <Col lg="4">
              <MultiChart />
            </Col>
            <Col lg="4">
              <BarChart />
            </Col>
            <Col lg="4">
              <PieChart />
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="12">
              <TableEditable />
            </Col>
            <Col lg="6" md="12">
              <TableSimple />
            </Col>
          </Row> */}
            {/* <Row>
            <Col xs="12">
              <Notifications />
            </Col>
          </Row> */}
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