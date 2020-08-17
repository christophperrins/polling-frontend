import React, { Component } from 'react';
import axios from 'axios';

export default class SubmitEndpoint extends Component {

  constructor(props) {
    super(props);
    if (this.props.endpoint) {
      this.name = this.props.endpoint.name || "";
      this.endpoint = this.props.endpoint.endpoint || "";
      this.frequency = this.props.endpoint.frequency || 1000;
    }
  }

  submit = (event) => {
    event.preventDefault();
    let form = event.target;
    let body = {};
    for(let input of form) {
      if (input.type === "submit"){
        continue;
      }
      if(input.type === "number") {
        body[input.name] = Number(input.value);
      } else {
        body[input.name] = input.value;
      }
    }
    if (!this.endpoint){
      axios.post("http://"+window.location.hostname+":9000/api/poll", body).then(() => this.props.getEndpoints());
    } else {
      axios.put("http://"+window.location.hostname+":9000/api/poll", body).then(() => this.props.getEndpoints());
    }

  }

  render() {
    return <div className="w-75 card m-auto">
      <h3 className="left m-2">Add to polling</h3>
      <form onSubmit={this.submit}>
        <div className="container">
          <div className="row">
            <input type="text" className="col-sm-10 col-lg-5 form-control m-2" name="name" placeholder="Endpoint Name e.g. OMDB" aria-label="Endpoint Name" defaultValue={this.name}/>

            <input type="text" disabled={this.endpoint} className="col-sm-10 col-lg-5 form-control m-2" name="endpoint" placeholder="Endpoint URL e.g. http://www.omdbapi.com" aria-label="Endpoint Name" defaultValue={this.endpoint}/>

            <input type="number" className="col-sm-10 col-lg-5 form-control m-2" name="frequency" placeholder="Poll once every (ms) e.g. 5000" aria-label="Poll time" min="1000" max="30000" defaultValue={this.frequency}/>

            <input type="submit" className="m-2 btn btn-success" value={this.endpoint ? "Update" : "Submit"}></input>
          </div>
        </div>
      </form>
    </div>
  }
}



