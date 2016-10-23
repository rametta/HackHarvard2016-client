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

export default class StockCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      data: [],
      title: "",
      expanded: false,
      optionData: {},
      defaultOptions: {
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
      }
    };
  }

  componentWillMount() {
    const { quotes } = this.props.data;
    let labels = [];
    let data = [];

    quotes.forEach(quote => {
      labels.unshift(quote.Date);
      data.unshift(parseFloat(quote.Close));
    });

    let a = {};
    Object.assign(a, this.state.defaultOptions);
    a.labels = labels;
    a.datasets[0].data = data;
    a.datasets[0].label = quotes[0].Symbol;

    this.setState({optionData: a});
  }

  componentDidMount() {
    this.getROI();
    this.getColor();
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

  findSymbolImg = () => {
      const symbol = this.props.data.quotes[0].Symbol.trim();
      let url = tickers.module.find(ticker => {
        return symbol == ticker.Symbol.trim();
      });
      url = url.Image;

      if(typeof url !== "undefined"){
        return url
      }
      return "default.png";
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

  getROI() {
    let roi = this.props.data.sentiment > 0 ? "+" : "-";
    roi += (Math.floor(Math.random() * 6) + 1) + "%";
    this.setState({ roi });
  }

  getColor() {
    const color = Math.floor(Math.random() * 6) + 1 > 3 ? "green" : "red";
    this.setState({ color });
  }

  render() {
    const symbol = `$${this.props.data.quotes[0].Symbol.toUpperCase()}`;
    const label = `Sentiment: ${this.props.data.sentiment.toFixed(2)}`;
    const close = parseFloat(this.props.data.quotes[0].Close).toFixed(1);
    const photo = this.findSymbolImg();

    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        className="stock-card circular">

        <CardHeader
          title={symbol}
          avatar={`../../style/img/stock/${photo}`}
          actAsExpander
          showExpandableButton
        />

        <CardText>
          <Row>

            <CardSection>
              <KPI label="Potential ROI" value={this.state.roi} />
            </CardSection>

            <CardSection borders>
              <KPI icon={this.state.color} label={label} value={close} />
            </CardSection>

            <CardSection>
              <Line data={this.state.optionData}/>
            </CardSection>

          </Row>
        </CardText>

        <CardActions>
          <RaisedButton
            label="Live Tweets"
            backgroundColor="#29B6F6"
            labelColor="#ffffff"
            onTouchTap={this.toggleDrawer} />
          {this.renderButton()}
        </CardActions>

      </Card>
    );
  }
}
