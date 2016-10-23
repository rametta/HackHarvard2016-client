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
    if(this.props.open){
      console.log(this.props.data);
      return this.props.data.map((tweet, i) => {
        return <Tweet data={tweet} key={i} />;
      });
    }
  }

  render() {
    //const drawerTitle = `Tweets for $${this.props.data.quotes[0].Symbol.toUpperCase()}`;
    return (
      <Drawer width={400} openSecondary={false} open={this.props.open} >
        <AppBar
          title={"Recent Tweets"}
          iconElementLeft = {
            <IconButton onTouchTap={this.props.toggleDrawer} >
              <NavigationClose/>
            </IconButton> }/>

        {this._renderTweets()}

      </Drawer>
    );
  }
}
