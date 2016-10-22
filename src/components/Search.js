import React, { Component } from 'react';

// Material Design Components
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

// Custom Components
import Container from './common/Container';

export default class SearchBar extends Component {

    constructor() {
      super();
      this.state = {
        input: "",
        isValid: true,
        labelText: "Enter a Stock Symbol",
        errorText: ""
      };
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
              <div className="row" >
                  <div className="col-sm-8 col-xs-9 col-sm-offset-2" >
                    <TextField
                      hintText="Ex. $AAPL"
                      fullWidth
                      floatingLabelText={this.state.labelText}
                      errorText={this.state.errorText}
                      onChange={this.onInputChange}
                      onKeyUp={this.onInputChange}
                      value={this.state.input}
                      floatingLabelFixed={false} />
                  </div>
                <div className="col-xs-2" >
                  <FloatingActionButton
                    onTouchTap={() => this.getStockData()}
                    className="btn-add-stock">
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
              </div>
          </Container>
         </div>
      );
    }
}
