import React, { Fragment } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
import Header from 'components/Header';
import LineChart from 'components/Charts/LineChart';
import BarChart from 'components/Charts/BarChart';
import PieChart from 'components/Charts/PieChart';
import MultiChart from 'components/Charts/MultiChart';
import TableEditable from 'components/Tables/TableEditable';
import TableSimple from 'components/Tables/TableSimple';

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
  render() {

    return (
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
                          <Header />
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
              <LineChart />
            </Col>
          </Row>
          <Row>
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
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
