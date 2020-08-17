import React from 'react';
import './App.css';
import SubmitEndpoint from './SubmitEndpoint'
import EndpointContainer from './EndpointContainer'
import axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      endpoints: []
    };
  }

  componentDidMount = () => {
    this.getEndpoints();
  }

  getEndpoints = () => {
    axios.get("http://"+window.location.hostname+":9000/api/poll")
      .then(response => this.setState({endpoints:response.data}));
  }

  render() {
    return <div className="App">
      <header className="App-header">
        <h1 className="mx-3">Orchestrator</h1>
      </header>
      <div className="content">
      <SubmitEndpoint getEndpoints={this.getEndpoints}></SubmitEndpoint>
      {this.state.endpoints.map(endpoint => <EndpointContainer endpoint={endpoint} getEndpoints={this.getEndpoints}></EndpointContainer>)}
      </div>
    </div>
  }
}
