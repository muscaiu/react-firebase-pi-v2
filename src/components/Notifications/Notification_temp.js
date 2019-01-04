import React, { Fragment } from "react";
import NotificationAlert from "react-notification-alert";

import { Button } from "reactstrap";

class Notification extends React.Component {
    notify = place => {
        console.log(this.refs);
        var color = Math.floor(Math.random() * 5 + 1);
        var type;
        switch (color) {
            case 1:
                type = "primary";
                break;
            case 2:
                type = "success";
                break;
            case 3:
                type = "danger";
                break;
            case 4:
                type = "warning";
                break;
            case 5:
                type = "info";
                break;
            default:
                break;
        }
        var options = {};
        options = {
            place,
            message: (
                <div>
                    <div>
                        Notification
          </div>
                </div>
            ),
            type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    };
    render() {
        return (
            <Fragment>
                <div className="content">
                    {/* <div className="react-notification-alert-container">
                        <NotificationAlert ref="notificationAlert" />
                    </div> */}
                    <Button
                        block
                        color="primary"
                        onClick={() => this.notify("tr")}
                    >
                        Top Right
                    </Button>
                </div>
            </Fragment>
        );
    }
}

export default Notification;
