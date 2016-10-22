import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Tweet from './Tweet'

export default class Sidebar extends Component {
 constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          primary={true}  
          label="SEE RECENT STOCK TWEETS"
          onTouchTap={this.handleToggle}
        />
        <Drawer width={400} openSecondary={false} open={this.state.open} >
          <AppBar 
          title="Recent Stock Tweets"
          //showMenuIconButton = {false}
          iconElementLeft = { 
              <IconButton
              onTouchTap={this.handleToggle}
              >
              <NavigationClose/>
              </IconButton> }
          />
          <Tweet/>
        </Drawer>
      </div>
    );
  }
}
