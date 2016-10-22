import React, { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import Chart from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import Row from './common/Row';
import CardSection from './CardSection';
import KPI from './KPI';

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

export default class StockCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  toggleCardExpand = () => {
    if(this.state.expanded) {
      this.setState({expanded: false});
      return;
    }
    this.setState({expanded: true});
  }

  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>

        <CardHeader
          title="Apple"
          subtitle="$AAPL"
          avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/2000px-Apple_logo_black.svg.png"
          actAsExpander
          showExpandableButton
        />

        <CardText>
          <Row>

            <CardSection border>
              <KPI roi={"27.4%"} />
            </CardSection>

            <CardSection border>
              <Doughnut data={data} />
            </CardSection>

            <CardSection>

            </CardSection>

          </Row>
        </CardText>

        <CardText expandable>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>

        <CardActions>
          <RaisedButton
            primary
            label={this.state.expanded ? "View Less" : "View More"}
            onTouchTap={this.toggleCardExpand} />
        </CardActions>

      </Card>
    );
  }
}
