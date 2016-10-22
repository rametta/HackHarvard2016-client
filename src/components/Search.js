import React, { Component } from 'react';
import TextField from 'material-ui/TextField';


export default class SearchBar extends Component {
  constructor() {
    super();
    this.state={
      input: "",
      isValid: true
    }
  }
  validate() {
    if(this.state.input.length > 5 || this.state.input.length < 0)
    {
      this.setState({isValid: false});
    }
  }
  render() {
    //function to check whether inputted text is proper length to search stock
    this.validate();
    return (
      <TextField className="SearchBar"
      hintText="Ex. $AAPL"
      fullWidth={true}
      floatingLabelText="Enter a stock symbol to generate a card"
      onTouchTap = {
          ev => this.setState({input: ev.target.value})
      }
      value={this.state.input}
      floatingLabelFixed={false}
      />
    );
  }
}