import React, { Component } from 'react';

// Material Design Components
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';


export default class Tweet extends Component {

  render() {
    const { user_name, text, date, profile_img } = this.props.data;
    return (
      <Card>
        <CardHeader
          title={user_name}
          subtitle={date}
          avatar={profile_img}
        />
        <CardText>
          {text}
        </CardText>
      </Card>
    );
  }
}
