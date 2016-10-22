import React, { Component } from 'react';

//KPI -> Key Performance Indicator
//ROI -> Return on Investment

export default class KPI extends Component {

  getIcon() {
    switch(this.props.icon){
      case "red":
        return <img className="svg" src="./../../style/img/arrowDown.svg" />;
        break;
      case "green":
        return <img className="svg" src="./../../style/img/arrowUp.svg" />;
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <div className="kpi-container">
        <span style={{fontSize: 26}}>{this.props.label}</span>
        <div className="kpi">
          {this.props.value}
          {this.getIcon()}
        </div>
      </div>
    );
  }
}
