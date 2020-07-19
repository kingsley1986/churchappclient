import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Event = (props) => (
  <div class="grid-container">
    <div className="wrap">
      <div className="tile">
        <img src={props.event.eventImage} />
        <div className="text">
          <h1>{props.event.title}</h1>
          <h2 className="animate-text">More lorem ipsum bacon ipsum here.</h2>
          <p className="animate-text">{props.event.description}</p>
          <div className="dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/events/")
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  eventList() {
    return this.state.events.map(function (currentEvent, i) {
      return <Event event={currentEvent} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <div className="row">{this.eventList()}</div>
      </div>
    );
  }
}
