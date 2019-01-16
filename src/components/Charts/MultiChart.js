import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
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
import { chartExample1 } from "variables/charts";

class MultiChart extends Component {
    static proptypes = {
        fbStatusList: PropTypes.array
    }

    static defaultProps = {
        fbStatusList: [],
    };

    state = {
        chartOption: "week"
    };

    setChartOption = name => {
        this.setState({
            chartOption: name
        });
    };

    getDay = days => moment().subtract(days, 'day').format('dd')
    getDayOfMonth = days => moment().subtract(days, 'day').format('DD')
    getMonth = month => moment().subtract(month, 'month').format('MMM')

    getDailyTotal = (day) => {
        const { fbStatusList } = this.props;
        const trueValues = [];
        let prev;
        const selectedDay = moment().subtract(day, 'day')

        fbStatusList && fbStatusList.forEach((status, index) => {
            if (status.createdAt && moment(status.createdAt.toDate()).isSame(selectedDay, 'day')) {
                if (status.value === false) {
                    prev = moment(status.createdAt.toDate(), "YYYYMMDD HH:mm:ss")
                } else {
                    if (index === 0) {
                        trueValues.push(moment().diff(moment(status.createdAt.toDate()), "seconds"))
                    } else {
                        trueValues.push(prev && prev.diff(moment(status.createdAt.toDate()), "seconds"))
                    }
                }
            }
        });

        const total = trueValues.length > 0 && trueValues.reduce((acc, curr) => acc + curr)
        return total ? Math.floor(total / 60) : 0
    }

    // getMonthlyTotal = (month) => {
    //     const { fbStatusList } = this.props;
    //     const trueValues = [];
    //     let prev;
    //     const selectedMonth = moment().subtract(month, 'month')

    //     fbStatusList && fbStatusList.map(status => {
    //         if (status.createdAt && moment(status.createdAt.toDate()).isSame(selectedMonth, 'month')) {
    //             if (status.value === false) {
    //                 prev = moment(status.createdAt.toDate(), "YYYYMMDD HH:mm:ss")
    //             } else {
    //                 trueValues.push(prev && prev.diff(moment(status.createdAt.toDate()), "seconds"))
    //             }
    //         }
    //     })
    //     const total = trueValues.length > 0 && trueValues.reduce((acc, curr) => acc + curr)
    //     return total ? Math.floor(total / 60) : 0
    // }

    render() {
        const { chartOption } = this.state;
        const daysArray = [6, 5, 4, 3, 2, 1, 0]
        const monthArray = [...Array(30).keys()]
        // const yearArray = [...Array(12).keys()]
        const dayLabels = daysArray.map(day => this.getDay(day))
        const monthLabels = monthArray.reverse().map(day => this.getDayOfMonth(day))
        // const yearLabels = yearArray.reverse().map(month => this.getMonth(month))
        const lastWeek = daysArray.map(day => this.getDailyTotal(day))
        const lastMonth = monthArray.map(day => this.getDailyTotal(day))
        // const lastYear = monthArray.map(month => this.getMonthlyTotal(month))
        const totalLastWeek = (lastWeek.reduce((acc, curr) => acc + curr) / 60).toFixed(1)
        const totalLastMonth = (lastMonth.reduce((acc, curr) => acc + curr) / 60).toFixed(1)

        return (
            <Card className="card-chart">
                <CardHeader>
                    <Row>
                        <Col className="text-left" sm="6">
                            <h5 className="card-category">{`Total Hours last ${chartOption}`}</h5>
                            <CardTitle tag="h3">
                                <i className="tim-icons icon-chart-pie-36 text-info" />{" "}
                                {chartOption === 'month' ? totalLastMonth : totalLastWeek}
                            </CardTitle>
                        </Col>
                        <Col sm="6">
                            <ButtonGroup
                                className="btn-group-toggle float-right"
                                data-toggle="buttons"
                            >
                                <Button
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: chartOption === "week"
                                    })}
                                    color="info"
                                    id="0"
                                    size="sm"
                                    onClick={() => this.setChartOption("week")}
                                >
                                    <span className="d-sm-block d-md-block d-lg-block d-xl-block">
                                        Week
                                    </span>
                                </Button>
                                <Button
                                    color="info"
                                    id="1"
                                    size="sm"
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: chartOption === "month"
                                    })}
                                    onClick={() => this.setChartOption("month")}
                                >
                                    <span className="d-sm-block d-md-block d-lg-block d-xl-block">
                                        Month
                                    </span>
                                </Button>
                                {/* <Button
                                    color="info"
                                    id="2"
                                    size="sm"
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: chartOption === "year"
                                    })}
                                    onClick={() => this.setChartOption("year")}
                                >
                                    <input
                                        className="d-none"
                                        name="options"
                                        type="radio"
                                    />
                                    <span className="d-sm-block d-md-block d-lg-block d-xl-block">
                                        Year
                                    </span>
                                    <span className="d-block d-sm-none">
                                        <i className="tim-icons icon-tap-02" />
                                    </span>
                                </Button> */}
                            </ButtonGroup>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                        <Line
                            data={
                                canvas => {
                                    let ctx = canvas.getContext("2d");
                                    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
                                    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
                                    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
                                    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

                                    return {
                                        labels: chartOption === 'month' ? monthLabels : dayLabels,
                                        datasets: [
                                            {
                                                label: "minutes",
                                                fill: true,
                                                backgroundColor: gradientStroke,
                                                borderColor: "#1f8ef1",
                                                borderWidth: 2,
                                                borderDash: [],
                                                borderDashOffset: 0.0,
                                                pointBackgroundColor: "#1f8ef1",
                                                pointBorderColor: "rgba(255,255,255,0)",
                                                pointHoverBackgroundColor: "#1f8ef1",
                                                pointBorderWidth: 20,
                                                pointHoverRadius: 4,
                                                pointHoverBorderWidth: 15,
                                                pointRadius: 4,
                                                data: chartOption === 'month' ? lastMonth : lastWeek
                                            }
                                        ]
                                    };
                                }
                            }
                            options={chartExample1.options}
                        />
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default MultiChart;



