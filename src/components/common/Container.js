import React, { Component } from 'react';

export default class Container extends Component {
  render() {
    return (
      <div className={this.props.fluid ? "container-fluid" : "container"}>
        {this.props.children}
      </div>
    );
  }
}
