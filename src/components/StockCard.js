import React, { Component } from 'react';

// Material Design Components
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import tickers from '../tickerSymbols';

// Chart Components
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';

// Custom Components
import Row from './common/Row';
import CardSection from './CardSection';
import KPI from './KPI';

let LINE_CHART_OPTIONS = {
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
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
    }
  ]
};

export default class StockCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      data: [],
      title: "",
      expanded: false
    };
  }

  componentDidMount() {
    const { quotes } = this.props.data;
    let labels = [];
    let data = [];

    quotes.forEach(quote => {
      labels.push(quote.Date);
      data.push(parseFloat(quote.Close));
    });

    this.setState({ labels, data, title: quotes[0].Symbol });
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

findSymbolImg(symbol){
    //iterate through the JSON obejct
    console.log(tickers.module.length);
    for(var i = 0; i < tickers.module.length; i++)
    {
      //console.log("Hello", tickers.module);
      //if I find the symbol and the image property is defined
      //console.log(tickers.module[i].Symbol, symbol);
      if("$" + tickers.module[i].Symbol == symbol)
      {
        //return the url 
        return tickers.module[i].Image;
      }
    }
    return "apple.png";
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

  getChartOptions() {
    LINE_CHART_OPTIONS.labels = this.state.labels;
    LINE_CHART_OPTIONS.datasets[0].data = this.state.data;
    LINE_CHART_OPTIONS.datasets[0].label = this.state.title;
    return LINE_CHART_OPTIONS;
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
          avatar={"../../style/img/stock/" + this.findSymbolImg(symbol)}
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
              <Line data={this.getChartOptions()}/>
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
