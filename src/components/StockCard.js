import React, { Component } from 'react';

// Material Design Components
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

// Chart Components
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';

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
      expanded: false
    };
  }

  handleExpandChange = expanded => {
    this.setState({ expanded });
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
    console.log('this.props.id', this.props.id);
    this.props.toggleDrawer(this.props.id);
  }

  renderButton() {
    const id = this.props.id;
    if(this.props.editCard){
      return( <RaisedButton
                labelStyle={{color: '#ffffff'}}
                className="btn-delete"
                label="Delete Card"
                backgroundColor="#f44336"
                onTouchTap={id => this.props.removeCard(id)} />);
    }
  }

  render() {
    const symbol = `$${this.props.data.quotes[0].Symbol.toUpperCase()}`;
    const label = `Sentiment: ${this.props.data.sentiment.toFixed(2)}`;
    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        className="stock-card circular">

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
            label="Live Tweets"
            backgroundColor="#29B6F6"
            labelColor="#ffffff"
            onTouchTap={this.toggleDrawer} />
          <RaisedButton
            primary
            label={this.state.expanded ? "View Less" : "View More"}
            onTouchTap={this.toggleCardExpand} />
          {this.renderButton()}
        </CardActions>

      </Card>
    );
  }
}
