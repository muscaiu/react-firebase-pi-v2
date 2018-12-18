import React, { Component } from 'react'
import { Line } from "react-chartjs-2";
import { connect } from 'react-redux';
import {
    firestoreConnect,
    // isLoaded
} from 'react-redux-firebase';
import { compose } from 'redux';
import classNames from "classnames";
import moment from 'moment';

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

// core components
import {
    chartExample1,
} from "variables/charts";

class LineChart extends Component {
    state = {
        bigChartData: "data1"
    };

    setBgChartData = name => {
        this.setState({
            bigChartData: name
        });
    };

    getDay = days => moment().subtract(days, 'day').format('dd')

    getTotal = (days) => {
        console.log(this.props.fbTotal);
        return this.props.fbTotal && this.props.fbTotal.find(val =>
            moment(val.createdAt.toDate()).isSame(moment().subtract(days, 'day'), 'day')
        )
    }

    render() {
        return (
            // isLoaded(this.props.fbTotal) ? (
            <Card className="card-chart">
                <CardHeader>
                    <Row>
                        <Col className="text-left" sm="6">
                            <h5 className="card-category">Total Shipments</h5>
                            <CardTitle tag="h2">Performance</CardTitle>
                        </Col>
                        <Col sm="6">
                            <ButtonGroup
                                className="btn-group-toggle float-right"
                                data-toggle="buttons"
                            >
                                <Button
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: this.state.bigChartData === "data1"
                                    })}
                                    color="info"
                                    id="0"
                                    size="sm"
                                    onClick={() => this.setBgChartData("data1")}
                                >
                                    <input
                                        defaultChecked
                                        className="d-none"
                                        name="options"
                                        type="radio"
                                    />
                                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                        Accounts
                                    </span>
                                    <span className="d-block d-sm-none">
                                        <i className="tim-icons icon-single-02" />
                                    </span>
                                </Button>
                                <Button
                                    color="info"
                                    id="1"
                                    size="sm"
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: this.state.bigChartData === "data2"
                                    })}
                                    onClick={() => this.setBgChartData("data2")}
                                >
                                    <input
                                        className="d-none"
                                        name="options"
                                        type="radio"
                                    />
                                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                        Purchases
                                    </span>
                                    <span className="d-block d-sm-none">
                                        <i className="tim-icons icon-gift-2" />
                                    </span>
                                </Button>
                                <Button
                                    color="info"
                                    id="2"
                                    size="sm"
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: this.state.bigChartData === "data3"
                                    })}
                                    onClick={() => this.setBgChartData("data3")}
                                >
                                    <input
                                        className="d-none"
                                        name="options"
                                        type="radio"
                                    />
                                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                        Sessions
                                    </span>
                                    <span className="d-block d-sm-none">
                                        <i className="tim-icons icon-tap-02" />
                                    </span>
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                        <Line
                            data={chartExample1[this.state.bigChartData]}
                            options={chartExample1.options}
                        />
                    </div>
                </CardBody>
            </Card>

            // ) : <div>loading...</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fbTotal: state.firestore.ordered.total
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'total', limit: 4, orderBy: ['createdAt', 'desc'] },
    ])
)(LineChart);



