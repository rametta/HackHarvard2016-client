import React, { Component } from 'react';

// Material Design Components
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';


export default class Tweet extends Component {

  render() {
    return (
      <Card>
        <CardHeader
          title="Twitter Username"
          subtitle="10/30/2016"
          avatar="images/ok-128.jpg"
        />
        <CardText>
          tweeet content goes here
        </CardText>
        <CardMedia
          expandable={true}
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="images/nature-600-337.jpg" />
        </CardMedia>
      </Card>
    );
  }
}
