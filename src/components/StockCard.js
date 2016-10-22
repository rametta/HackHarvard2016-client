import React, { Component } from 'react';

// Material Design Components
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider'

// Chart Components
import Chart from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

// Custom Components
import Row from './common/Row';
import CardSection from './CardSection';
import KPI from './KPI';

const lineChartOptions = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: '$AAPL',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default class StockCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sentiment: 64,
      expanded: false
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

  toggleDrawer = () => {
    this.props.toggleDrawer(this.props.symbol);
  }

  renderButton() {
    const symbol = this.props.symbol;
    if(this.props.editCard){
      return( <RaisedButton label="Delete Card" onTouchTap={symbol => this.props.removeCard(symbol)} />);
    }
  }

  render() {
    const symbol = `$${this.props.symbol.toUpperCase()}`;
    const label = `Sentiment: ${this.state.sentiment}`;
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} className="stock-card circular">

        <CardHeader
          title={symbol}
          avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/2000px-Apple_logo_black.svg.png"
          actAsExpander
          showExpandableButton
        />

        <CardText>
          <Row>

            <CardSection>
              <KPI label="Potential ROI" value={"27.4%"} />
            </CardSection>

            <CardSection borders>
              <KPI icon={"green"} label={label} value={"2"} />
            </CardSection>

            <CardSection>
              <Line data={lineChartOptions} />
            </CardSection>

          </Row>
        </CardText>

        <CardText expandable className="circular">
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
          <RaisedButton
            secondary
            label="Live Tweets"
            onTouchTap={this.toggleDrawer} />
          {this.renderButton()}
        </CardActions>

      </Card>
    );
  }
}
