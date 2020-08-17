import React from 'react';
import Chart from 'chart.js'

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'scatter',
      data: {
        datasets: [{
          label: this.props.endpoint.endpoint,
          data: this.props.data,
          backgroundColor: "#B7E1FF",
          borderColor: 'black',
          borderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 3,
          showLine: true
        }]
      },
      options: {
        title: "Performance",
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Response Time in ms'
            }
          }]
        }
      },
    });

  }

  render() {
    return (
      <canvas ref={this.chartRef} width={"100%"} />
    );
  }
}
