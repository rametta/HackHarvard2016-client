import React, { Component } from 'react';

export default class CardSection extends Component {

  style() {
    let classes = "col-sm-4 card-section";
    if(this.props.border) {
      classes += " border-right";
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
