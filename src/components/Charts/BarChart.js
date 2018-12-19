import React, { Component } from 'react'
import { Bar } from "react-chartjs-2";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";

import {
    chartExample3
} from "variables/charts";

class LineChart extends Component {

    render() {
        const chartData = [10, 20, 30, 40]

        return (
            <Card className="card-chart">
                <CardHeader>
                    <h5 className="card-category">Daily Sales</h5>
                    <CardTitle tag="h3">
                        <i className="tim-icons icon-bell-55 text-primary" />{" "}
                        3,500€
              </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">

                        <Bar
                            data={
                                canvas => {
                                    let ctx = canvas.getContext("2d");

                                    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                                    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
                                    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
                                    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

                                    return {
                                        labels: ["MON", "TUE", "WED", "THU", "FRI"],
                                        datasets: [
                                            {
                                                label: "Minutes",
                                                fill: true,
                                                backgroundColor: gradientStroke,
                                                hoverBackgroundColor: gradientStroke,
                                                borderColor: "#d048b6",
                                                borderWidth: 2,
                                                borderDash: [],
                                                borderDashOffset: 0.0,
                                                data: chartData
                                            }
                                        ]
                                    };
                                }
                            }
                            options={chartExample3.options}
                        />

                    </div>
                </CardBody>
            </Card>

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
        { collection: 'total' }
    ])
)(LineChart);


