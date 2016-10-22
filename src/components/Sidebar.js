import React, { Component } from 'react';

// Material Design Components
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

// Custom Components
import Tweet from './Tweet'

export default class Sidebar extends Component {

  _renderTweets() {
    return this.props.tweets.map(tweet => {
      return <Tweet content={tweet} />;
    });
  }

  render() {
    const drawerTitle = `Tweets for ${this.props.symbol}`;
    return (
      <Drawer width={400} openSecondary={false} open={this.props.open} >
        <AppBar
          title={drawerTitle}
          iconElementLeft = {
            <IconButton onTouchTap={this.props.toggleDrawer} >
              <NavigationClose/>
            </IconButton> }/>

        {this._renderTweets()}

      </Drawer>
    );
  }
}
