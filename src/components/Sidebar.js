import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';


export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  render() {
    return (
        <div>
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={this.handleToggle}
        />
        <Drawer width={200} openSecondary={true} open={this.state.open} >
          <AppBar title="AppBar" />
        </Drawer>
      </div>
  }
}
