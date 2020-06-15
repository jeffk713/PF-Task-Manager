import React from 'react';
import { connect } from 'react-redux';

import '../scss/Alert.style.scss';

const Alert = ({ alerts }) =>
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.color}`}>
      {alert.message}
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alertReducer,
});

export default connect(mapStateToProps)(Alert);
