import React, { Component } from 'react';
import axios from 'axios';

// Material Design Components
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';


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

class App extends Component {
  constructor(props) {
      super(props);
      injectTapEventPlugin();
      this.state = {
        drawer: false,
        drawerSymbolID: -1,
        data: [],
        editCards: false,
        isDialogVisible: true,
        isLoadingStock: false,
      };

      this.addCard = this.addCard.bind(this);
      this.renderLoading = this.renderLoading.bind(this);
  }

  toggleDrawer = stock => {
    console.log('stock; ', stock);
    this.setState({
      tweets: stock.tweets,
      drawer: !this.state.drawer
    });
  };

  addCard = symbol => {
      //const URL = `http://52.44.145.202:3001/search/tweets?q=${symbol}%20OR%20%24${symbol}&count=15&lang=en`;
      const URL = `http://52.44.145.202:3001/search/tweets?q=${symbol}&lang=en`;

      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const me = this;
      this.setState({isLoadingStock: true}, function() {
        axios.get(URL, config)
        .then((response) => {
          console.log(response.data);
          me._setData(response.data);
          this.setState({isLoadingStock: false});
        })
        .catch((error) =>{
          console.log(error)  ;
          this.setState({isLoadingStock: false});
        });
      });
  }

  _setData(data) {
    this.setState({ data: this.state.data.concat(data) });
  }

  _renderStockCards() {
    if (this.props.user.length && this.props.user[0].username) {
      console.log('we made it', this.state.data);
      return this.state.data.map((stock, i) => {
        return <StockCard
          removeCard={() => this.removeCard(stock)}
          editCard={this.state.editCards}
          key={i}
          id={i}
          data={stock}
          toggleDrawer={() => this.toggleDrawer(stock)}/>;
      });
    } else {
      return (
        <Row>
          <div>
            <img className="empty-screen" src="./../../style/img/empty-screen.png" />
          </div>
        </Row>
      )
    }
  }

  editCards(){
    this.setState({editCards: !this.state.editCards})
  }

  renderLoading() {
    console.log('....',this.state.isLoadingStock);
    if (this.state.isLoadingStock == true) {
      return (
        <Row>
          <div className="alignCenter">
            <CircularProgress />
          </div>
        </Row>
      );
    }
    return <div></div>
  };

  removeCard(stock) {
    var updatedList = this.state.data.filter(function(elem, index) {
      console.log(elem.sentiment);
      console.log(stock.sentiment);
      return elem.sentiment == stock.sentiment ? false : true;
    });

    console.log('updated list: ', updatedList);
    this.setState({data: updatedList});
  }

  render() {
    const { isDialogVisible } = this.state;
    const shouldLoad = this.renderLoading();
    console.log('this.state.data', this.state.data);
    return (
      <MuiThemeProvider>
        <Container fluid>
          <Row>
            <div className="col-lg-12">
              <SearchBar addCard={symbol => this.addCard(symbol)}
                        editCards={() => this.editCards()}
              />
              <Sidebar
                data={this.state.tweets}
                open={this.state.drawer}
                toggleDrawer={this.toggleDrawer} />
            </div>
          </Row>
          <Row>
            <div className="col-lg-12">
              {this._renderStockCards()}
            </div>
          </Row>
          {shouldLoad}
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
