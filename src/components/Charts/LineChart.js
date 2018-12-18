import React, { Component } from 'react'
import { Line } from "react-chartjs-2";
import { connect } from 'react-redux';
import {
    firestoreConnect,
    // isLoaded
} from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";

import { chartExample2 } from "variables/charts";

class LineChart extends Component {

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
                    <h5 className="card-category">Total Hours This Week</h5>
                    <CardTitle tag="h3">
                        <i className="tim-icons icon-bell-55 text-info" />{" "}
                        763,215
                  </CardTitle>
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
                                        labels: [
                                            this.getDay(6),
                                            this.getDay(5),
                                            this.getDay(4),
                                            this.getDay(3),
                                            this.getDay(2),
                                            this.getDay(1),
                                            this.getDay(0)
                                        ],
                                        datasets: [
                                            {
                                                label: "Minutes",
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
                                                data: [
                                                    this.getTotal(6) ? this.getTotal(6).total : 0,
                                                    this.getTotal(5) ? this.getTotal(5).total : 0,
                                                    this.getTotal(4) ? this.getTotal(4).total : 0,
                                                    this.getTotal(3) ? this.getTotal(3).total : 0,
                                                    this.getTotal(2) ? this.getTotal(2).total : 0,
                                                    this.getTotal(1) ? this.getTotal(1).total : 0,
                                                    this.getTotal(0) ? this.getTotal(0).total : 0,
                                                ]
                                            }
                                        ]
                                    };
                                }
                            }
                            options={chartExample2.options}
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