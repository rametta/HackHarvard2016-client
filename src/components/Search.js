import React, { Component } from 'react';

// Material Design Components
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

// Custom Components
import Container from './common/Container';
import Row from './common/Row';

// All Tickers database
import tickers from './../tickerSymbols';

export default class SearchBar extends Component {

    constructor() {
      super();
      this.state = {
        input: "",
        isValid: true,
        symbolList: [],
        labelText: "Enter a Stock Symbol",
        errorText: ""
      };
    }

    //This is for the predictive text input auto-complete feature
    componentDidMount() {
      const symbolList = tickers.module.map(ticker => {
        return ticker.Symbol;
      });
      this.setState({ symbolList });
    }

    //Check whether input text is proper length to search stock symbol
    validate() {
      if (this.state.input.length > 5 || this.state.input.length < 1) {
        return false;
      }
      return true;
    }

    onInputChange = ev => {
      this.setState({ input: ev.target.value })
      if (ev.keyCode === 13) {
        this.getStockData();
      }
    }

    getStockData() {
      if(this.validate()){
        this.props.addCard(this.state.input);
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
                      onChange={this.onInputChange}
                      onKeyUp={this.onInputChange}
                      value={this.state.input}
                      floatingLabelFixed={false}
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={this.state.symbolList}
                      maxSearchResults={7} />
                  </div>
                <div className="col-xs-2" >
                  <div className="btn-group">
                    <FloatingActionButton
                      onTouchTap={() => this.getStockData()}>
                      <ContentAdd />
                    </FloatingActionButton>

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
