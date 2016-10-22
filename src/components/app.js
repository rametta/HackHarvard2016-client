import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Card from './Card';

export default class SideBar extends Component {
  constructor() {
      super();
      injectTapEventPlugin();
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
          <Card />
      </div>
      </MuiThemeProvider>
    );
  }
}
