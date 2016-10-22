import React, { Component } from 'react';

// Material Design Components
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Custom Components
import Container from './common/Container';
import Row from './common/Row';
import StockCard from './StockCard';
import SearchBar from './Search';
import Sidebar from './Sidebar';

// Fake Data
import tweets from './../fakeTweets';

export default class App extends Component {
  constructor() {
      super();
      injectTapEventPlugin();
      this.state = {
        drawer: false,
        drawerSymbol: "AAPL",
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
                tweets={tweets}
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
