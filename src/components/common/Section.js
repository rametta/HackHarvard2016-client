import React, { Component } from 'react';

export default class Section extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
