import React, { Component } from 'react';

//KPI -> Key Performance Indicator
//ROI -> Return on Investment

export default class KPI extends Component {
  render() {
    return (
      <div className="kpi-container">
        {this.props.label}
        <div className="kpi">
          {this.props.value}
        </div>
      </div>
    );
  }
}
