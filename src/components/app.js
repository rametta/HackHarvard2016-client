import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Container from './common/Container';
import Row from './common/Row';
import StockCard from './StockCard';
import SearchBar from './Search';
import Sidebar from './Sidebar';

export default class App extends Component {
  constructor() {
      super();
      injectTapEventPlugin();
      this.state = {
        drawer: false,
        drawerSymbol: "AAPL",
        tweets: ["tweet 1", "tweet 2"],
        symbols: ["AAPL"]
      };
  }

  toggleDrawer = () => this.setState({drawer: !this.state.drawer});

  render() {
    return (
      <MuiThemeProvider>
        <Container fluid>
          <Row>
            <div className="col-lg-12">
              <SearchBar />
              <Sidebar
                tweets={this.state.tweets}
                symbol={this.state.drawerSymbol}
                open={this.state.drawer}
                toggleDrawer={this.toggleDrawer} />
            </div>
          </Row>
          <Row>
            <div className="col-lg-12">
              <StockCard
                symbol={this.state.symbols[0]}
                toggleDrawer={this.toggleDrawer}/>
            </div>
          </Row>
        </Container>
      </MuiThemeProvider>
    );
  }
}
