import React, { Component } from 'react'
import { Pie } from "react-chartjs-2";
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
    chartExample4
} from "variables/charts";

class LineChart extends Component {

    render() {
        // const chartData = [10, 20, 30, 40]

        return (
            <Card className="card-chart">
                <CardHeader>
                    <h5 className="card-category">Pie</h5>
                    <CardTitle tag="h3">
                        <i className="tim-icons icon-send text-success" /> 12,100K
              </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                        <Pie
                            data={chartExample4.data}
                            options={chartExample4.options}
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




