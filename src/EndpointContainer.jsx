import React, { Component } from 'react';
import axios from 'axios';
import Graph from './Graph';
import SubmitEndpoint from './SubmitEndpoint'

export default class EndpointContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      history: [],
      loaded: false,
      showUpdate: false
    }
    this.myRef = React.createRef();
  }

  componentDidMount = () => {
    this.getHistory();
  }

  getHistory = () => {
    axios.put("http://"+window.location.hostname+":9000/api/history", this.props.endpoint.endpoint, {
      headers: {
        'Content-Type': "text/plain"
      }
    }).then(response => this.setState({ history: response.data, loaded: true, expand: false }));
  }

  deleteEndpoint = () => {
    axios.post("http://"+window.location.hostname+":9000/api/poll/delete", this.props.endpoint.endpoint, {
      headers: {
        'Content-Type': "text/plain"
      }
    }).then(() => this.props.getEndpoints())
  }

  displayMostRecent = () => {
    if (this.state.loaded && this.state.history[this.state.history.length - 1]) {
      let timedate = this.state.history[this.state.history.length - 1].timedate;
      timedate = timedate.split("T");
      let date = timedate[0];
      let time = timedate[1].split(".")[0].split(":");
      time[0] = Number(time[0]) +1;
      time = time.join(":")
      

      return (
        <React.Fragment>
          <h6>Status: {this.state.history[this.state.history.length-1].status}</h6>
          <h6>Response Time: {this.state.history[this.state.history.length-1].responseTime} ms</h6>
          <h6>Last checked: {`${date} ${time}`}</h6>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
        <h6>Status: loading...</h6>
        <h6>Response Time: loading...</h6>
        <h6>Last checked: loading...</h6>
      </React.Fragment>
      )
    }
  }

  displayUpdate = () => {
    if(this.state.showUpdate) {
      return  <SubmitEndpoint getEndpoints={this.props.getEndpoints} endpoint={this.props.endpoint}/>
    }
  }

  displayGraph = () => {
    if (this.state.loaded && this.state.expand) {
      let date = new Date();
      let timeInSeconds = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
      let data = this.state.history.map(history => {
        let response = {};
        let timedate = history.timedate;
        timedate = timedate.split("T");
        let time = timedate[1].split(".")[0].split(":");
        let timeX = Number(time[0] * 60 * 60) + Number(time[1] * 60) + Number(time[2]);
        let timeDifference = timeX - timeInSeconds;
        response.x = timeDifference +3600;
        response.y = history.responseTime;
        return response;
      });

      return (
        <React.Fragment>
          <div className="col-6 p-0">
            <Graph data={data} endpoint={this.props.endpoint} />
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (

      <div className="flexcontainer my-2">
        <button className="card endpoint m-auto">
          <div className="row justify-content-around p-2 w-100">
            <div className="col-lg-5 col-sm-12 p-0">
              <h4>{this.props.endpoint.name}</h4>
              <h6>{this.props.endpoint.endpoint}</h6>
              <h6>Polls every {this.props.endpoint.frequency} ms</h6>
            </div>
            <div className="col-lg-5 col-sm-12 p-0">
              {this.displayMostRecent()}
            </div>
            <div className="col-lg-2 col-sm-12 p-0">
              <a className="d-block" href="#" onClick={() => { this.props.getEndpoints(); this.getHistory()}}>
                <img src="/refresh.png" width="16" height="16" />
              </a>
              <a className="d-block" href="#" onClick={() => { this.deleteEndpoint() }}>
                <img src="/bin.jpg" width="16" height="16" />
              </a>
              <a className="d-block" href="#" onClick={() => { this.setState({showUpdate: !this.state.showUpdate}) }}>
                <img src="/edit.png" width="16" height="16" />
              </a>
              <a className="d-block" href="#" onClick={() => { if (this.state.loaded) { this.setState({ expand: !this.state.expand }) } }}>
                <img src="/graph.png" width="16" height="16" />
              </a>
            </div>
            {this.displayGraph()}
          </div>
        </button>

        {this.displayUpdate()}
      </div>
    )
  }
}

