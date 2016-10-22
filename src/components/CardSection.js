import React, { Component } from 'react';

export default class CardSection extends Component {

  style() {
    let classes = "col-sm-4";
    if(this.props.borders) {
      classes += " border-right border-left";
    }
    return classes;
  }

  render() {
    return (
      <div className={this.style()}>
        {this.props.children}
      </div>
    );
  }
}
