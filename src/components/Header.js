import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

import Spinner from 'components/Spinner';
import OnOffSwitch from './OnOffSwitch';
// import Weather from './Weather';
import pack from '../../package.json'
import moment from 'moment';

const Wrapper = styled.div`
  padding-top: 50px;
`;

const Version = styled.div`
  color: darkgrey;
  font-size: 8px;
  position: fixed;
  bottom: 10px;
  padding: 10px;
`;

class Header extends Component {

  hanldeToggleMode = () => {
    console.log('hanldeToggleMode');
    this.props.toggleMode(this.props.fbMode);
  }

  hanldeToggleStats = () => {
    this.props.toggleStatus(this.props.fbStatus);
  }

  getStatuses = () => {
    const { fbAllStatuses } = this.props;
    const trueValues = [];
    if (fbAllStatuses) {
      for (let i = 0; i < fbAllStatuses.length; i++) {
        if (fbAllStatuses[i].value === true) {
          var mom = moment(fbAllStatuses[i].createdAt, 'HHmmss');
          const momFormated = mom.format('MMMM Do YYYY, h:mm:ss a');
          trueValues.push(momFormated)
          return momFormated
        }
      }
    }
    console.log(trueValues)
  }

  render() {
    const { fbStatus, fbMode, fbLastAction, fbTotal } = this.props;

    return (
      <Wrapper>
        {
          isLoaded(fbStatus) ?
            <div>
              <Spinner isActive={fbStatus} />
              <OnOffSwitch
                isActive={fbStatus}
                onStatusClick={this.hanldeToggleStats}
                fbLastAction={fbLastAction}
                fbTotal={fbTotal}
                mode={fbMode}
              />
              {/* {lastWeatherUpdate &&
                <Weather lastWeatherUpdate={lastWeatherUpdate} />
              } */}
              <Version>version: {pack.version}</Version>
            </div>
            : null
        }
      </Wrapper>
    )
  }
}


function mapStateToProps(state) {
  const fbStatusList = state.firestore.ordered.status;
  const fbModeList = state.firestore.ordered.mode;

  return {
    fbStatus: fbStatusList && fbStatusList[0].value,
    fbMode: fbModeList && fbModeList[0].value,
    fbLastAction: fbStatusList && fbStatusList[0].createdAt,
    fbTotal: state.firestore.ordered.total
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'status', limit: 1, orderBy: ['createdAt', 'desc'] },
    { collection: 'mode', limit: 1, orderBy: ['createdAt', 'desc'] },
    { collection: 'total' }
  ])
)(Header);
