import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Container from './common/Container';
import Row from './common/Row';
import StockCard from './StockCard';
import SearchBar from './Search'

export default class SideBar extends Component {
  constructor() {
      super();
      injectTapEventPlugin();
  }

  render() {
    return (
      <MuiThemeProvider>
      <Container fluid>
        <Row>
          <div className="col-lg-12">
            <SearchBar />
          </div>
        </Row>
        <Row>
          <div className="col-lg-12">
            <StockCard />
          </div>
        </Row>
      </Container>
      </MuiThemeProvider>
    );
  }
}
