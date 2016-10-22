import React, { Component } from 'react';

// Material Design Components
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';


export default class Tweet extends Component {

  render() {
    const { username, content, date, photo } = this.props.data;
    return (
      <Card>
        <CardHeader
          title={username}
          subtitle={date}
          avatar={photo}
        />
        <CardText>
          {content}
        </CardText>
      </Card>
    );
  }
}
