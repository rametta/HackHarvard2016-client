import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


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
    <div className="SearchBar">
     <Container fluid >

      <div class="row">
        <div class="col-md-8">
          <TextField
          hintText="Ex. $AAPL"
          fullWidth={true}
          floatingLabelText="Enter a stock symbol to generate a card"
          onChange = {
              ev => this.setState({input: ev.target.value})
          }
          value={this.state.input}
          floatingLabelFixed={false}
          />
       </div>
       <div class="col-md-4">
        <FloatingActionButton style="default">
          <ContentAdd />
        </FloatingActionButton>
      </div>
    </div>
  />
</div>
    );
  }
}