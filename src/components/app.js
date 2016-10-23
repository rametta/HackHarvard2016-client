import React, { Component } from 'react';
import axios from 'axios';

// Material Design Components
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

// Custom Components
import Container from './common/Container';
import Row from './common/Row';
import StockCard from './StockCard';
import SearchBar from './Search';
import Sidebar from './Sidebar';
import DialogModal from './AuthModal';

// Actions + Redux
import * as actions from '../actions';
import { connect } from 'react-redux';

// Fake Data
import tweets from './../fakeTweets';

class App extends Component {
  constructor(props) {
      super(props);
      injectTapEventPlugin();
      this.state = {
        drawer: false,
        drawerSymbol: "AAPL",
        symbols: ["AAPL"],
        editCards: false,
        isDialogVisible: true,
      };
  }

  toggleDrawer = symbol => this.setState({
    drawerSymbol: symbol,
    drawer: !this.state.drawer
  });

  addCard(symbol) {
      const BASE_URL = `http://52.44.145.202:3000/search/tweets?q=${symbol}%20OR%20%24${symbol}&count=15&lang=en`;

      console.log('symbol: ' + symbol);

      axios.get(BASE_URL)
      .then(function (response) {
        console.log(response);
        //this.setState({symbols: this.state.symbols.concat(symbol)});
      })
      .catch(function (error) {
        console.log(error);
      });

      this.setState({symbols: this.state.symbols.concat(symbol)});
  }

  _renderStockCards() {
    console.log('ASDASDAS',this.props.user);
    if(this.props.user.length && this.props.user[0].username) {
      console.log('user is here: ', this.props.user);
      return this.state.symbols.map(symbol => {
        return <StockCard
          removeCard={ticker => this.removeCard(symbol)}
          editCard={this.state.editCards}
          key={symbol}
          symbol={symbol}
          toggleDrawer={symbol => this.toggleDrawer(symbol)} />;
      });
    } else {
      return <div>Show 1 card here</div>
    }

  }

  fetchData(symbol) {
    this.props.getStockHistorical(symbol,'2016-01-01', '2016-09-09');
  }

  editCards(){
    this.setState({editCards: !this.state.editCards})
  }

  removeCard(ticker) {
    var updatedList = this.state.symbols.filter(function(elem, index) {
      return elem === ticker ? false : true;
    });

    this.setState({symbols: updatedList});
  }

  render() {
    console.log('user:!!', this.props.user);
    const { isDialogVisible } = this.state;

    return (
      <MuiThemeProvider>
        <Container fluid>
          <Row>
            <div className="col-lg-12">
              <SearchBar addCard={symbol => this.addCard(symbol)}
                        editCards={() => this.editCards()}
              />
              <Sidebar
                tweets={tweets}
                symbol={this.state.drawerSymbol}
                open={this.state.drawer}
                toggleDrawer={this.toggleDrawer} />
            </div>
          </Row>
          <Row>
            <div className="col-lg-12">
              {this._renderStockCards()}
            </div>
          </Row>
          <Row>
            <DialogModal
              isVisble={isDialogVisible}
              user={this.props.user}
              login={this.props.login}
              logout={this.props.logout}
            />
          </Row>
        </Container>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ login, logout, test, user, getStockHistorical, histData }) => ({ login, logout, test, user, getStockHistorical, histData });

export default connect(mapStateToProps, actions)(App);
