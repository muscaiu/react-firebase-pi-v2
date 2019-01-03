import React, { Fragment } from "react";
import NotificationAlert from "react-notification-alert";

import { Button } from "reactstrap";

class Notifications extends React.Component {
  notify = place => {
    console.log(place)
    let options = {
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
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
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

export default Notifications;
