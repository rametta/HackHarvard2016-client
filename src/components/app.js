import React, { Component } from 'react';

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


      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
  }

  toggleDrawer = symbol => this.setState({
    drawerSymbol: symbol,
    drawer: !this.state.drawer
  });

  addCard(symbol) {
      this.props.getStockHistorical(symbol,'2016-01-01', '2016-09-09');
      this.setState({symbols: this.state.symbols.concat(symbol)});
  }

  _renderStockCards() {
    return this.state.symbols.map(symbol => {
      return <StockCard editCard={this.state.editCards} key={symbol} symbol={symbol} toggleDrawer={symbol => this.toggleDrawer(symbol)} />;
    });
  }

  login() {
    this.props.login({username: 'john', password: '123'});
    //this.props.test();
  }

  logout() {
    this.props.logout();
  }

  fetchData(symbol) {
    this.props.getStockHistorical(symbol,'2016-01-01', '2016-09-09');
  }

  editCards(){
    this.setState({editCards: !this.state.editCards})
  }

  removeCard(symbol) {
    console.log("removing...", symbol);
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
                        removeCard={symbol => this.removeCard(symbol)}
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
            <RaisedButton
              primary
              className="loginbtn"
              label={this.props.user.length ? "Logout" : "Login"}
              onTouchTap={this.props.user.length ? this.logout : this.login} />
          </Row>
          <Row>
            <DialogModal
              isVisble={isDialogVisible}
              action={this.login}
              className="loginbtn"
            />
          </Row>
        </Container>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ login, logout, test, user, getStockHistorical, histData }) => ({ login, logout, test, user, getStockHistorical, histData });

export default connect(mapStateToProps, actions)(App);
