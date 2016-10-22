import React, { Component } from 'react';
import TextField from 'material-ui/TextField';


export default class SearchBar extends Component {
  render() {
    return (
      <TextField className="SearchBar"
      hintText="Hint Text"
      floatingLabelText="Fixed Floating Label Text"
      floatingLabelFixed={true}
      />
    );
  }
}