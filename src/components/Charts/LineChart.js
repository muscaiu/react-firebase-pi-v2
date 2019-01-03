import React, { Component } from 'react'
import { Line } from "react-chartjs-2";
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

  // getTotalPerDay = (days) => {
  //   return this.props.fbTotal && this.props.fbTotal.find(val =>
  //     val.createdAt && moment(val.createdAt.toDate()).isSame(moment().subtract(days, 'day'), 'day')
  //   )
  // }

  getTotalPerDay = (day) => {
    const { fbStatusList } = this.props;
    const trueValues = [];
    let prev;
    const selectedDay = moment().subtract(day, 'day')

    fbStatusList && fbStatusList.map(status => {
      if (status.createdAt && moment(status.createdAt.toDate()).isSame(selectedDay, 'day')) {
        if (status.value === false) {
          prev = moment(status.createdAt.toDate(), "YYYYMMDD HH:mm:ss")
        } else {
          trueValues.push(prev && prev.diff(moment(status.createdAt.toDate()), "seconds"))
        }
      }
    })
    const total = trueValues.length > 0 && trueValues.reduce((acc, curr) => acc + curr)
    return total ? Math.floor(total / 60) : 0
  }

  render() {
    const daysArray = [6, 5, 4, 3, 2, 1, 0]
    const labels = daysArray.map(day => this.getDay(day))
    // const lastWeek = daysArray.map(day => this.getTotalPerDay(day) ? Math.floor(this.getTotalPerDay(day).total / 60) : 0)
    const lastWeek = daysArray.map(day => this.getTotalPerDay(day))
    const totalLastWeek = (lastWeek.reduce((acc, curr) => acc + curr) / 60).toFixed(1)
    
    return (
      <Card className="card-chart">
        <CardHeader>
          <h5 className="card-category">Total Hours last 7 days</h5>
          <CardTitle tag="h3">
            <i className="tim-icons icon-bell-55 text-info" />{" "}
            {totalLastWeek}
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
                    labels,
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
                        data: lastWeek
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
    )
  }
}

export default LineChart;
