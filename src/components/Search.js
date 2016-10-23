import React, { Component } from 'react';

// Material Design Components
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import FlatButton from 'material-ui/FlatButton';

// Custom Components
import Container from './common/Container';
import Row from './common/Row';

// All Tickers database
import tickers from './../tickerSymbols';

export default class SearchBar extends Component {

    constructor(props) {
      super(props);
      this.state = {
        input: "",
        isValid: true,
        symbolList: [],
        labelText: "Enter a Stock Symbol",
        errorText: ""
      };

      this.validate = this.validate.bind(this);
      this.onInputChange = this.onInputChange.bind(this);
      this.getStockData = this.getStockData.bind(this);
    }

    //This is for the predictive text input auto-complete feature
    componentDidMount() {
      const symbolList = tickers.module.map(ticker => {
        return ticker.Symbol;
      });
      this.setState({ symbolList });
    }

    //Check whether input text is proper length to search stock symbol
    validate(symbol) {
      if (symbol.length > 5 || symbol.length < 1) {
        return false;
      }
      return true;
    }

    onInputChange = input => {
      this.getStockData(input);
    };

    getStockData(symbol) {
      if(this.validate(symbol)){
        this.props.addCard(symbol);
        this.setState({ errorText: "", input: "" });
        return;
      }
      this.setState({ errorText: "A symbol must be between 1 and 5 characters" });
    }

    render() {
      return (
        <div className="SearchBar" >
          <Container fluid >
              <Row>
                  <div className="col-sm-8 col-xs-9 col-sm-offset-2" >
                    <AutoComplete
                      hintText="Ex. $AAPL"
                      fullWidth
                      floatingLabelText={this.state.labelText}
                      errorText={this.state.errorText}
                      onNewRequest={this.onInputChange}
                      value={this.state.input}
                      floatingLabelFixed={false}
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={this.state.symbolList}
                      maxSearchResults={7} />
                  </div>
                <div className="col-xs-2" >
                  <div className="btn-group">
                    <FloatingActionButton
                      backgroundColor="#f44336"
                      onTouchTap={() => this.props.editCards()}
                      className="btn-remove-stock">
                        <img className="edit-icon" src="./../../style/img/edit.svg" />
                    </FloatingActionButton>
                  </div>
                </div>
              </Row>
          </Container>
         </div>
      );
    }
}
