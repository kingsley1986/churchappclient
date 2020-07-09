import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Event = (props) => (
  <div className="section">
    <div className="container">
      <div
        className="image-carousel style2 flexslider"
        data-animation="slide"
        data-item-width="270"
        data-item-margin="30"
      >
        <ul
          className="slides image-box hotel listing-style1"
          style={{
            width: "1000%",
            transition: "0.6s",
            transform: "translate3d(-300px, 0px, 0px)",
          }}
        >
          <li style={{ width: "270px", float: "left", display: "block" }}>
            <article className="box">
              <Link
                to={"/events/" + props.event._id + "/eventcomments"}
                className="hover-effect popup-gallery"
              >
                <img
                  width="270"
                  height="160"
                  alt=""
                  src={props.event.eventImage}
                  draggable="false"
                />
              </Link>
              <div className="details">
                {" "}
                <span className="price">
                  <small>avg/night</small>$188
                </span>
                <h4 className="box-title">
                  <Link to={"/events/" + props.event._id + "/eventcomments"}>
                    {props.event.title}
                    <small>Albufeira</small>
                  </Link>
                </h4>
                <div className="feedback">
                  <div
                    data-placement="bottom"
                    data-toggle="tooltip"
                    className="fa fa-star"
                    title=""
                    data-original-title="4 stars"
                  >
                    <span
                      style={{ width: "80%" }}
                      className="five-stars"
                    ></span>
                  </div>{" "}
                  <span className="review">170 reviews</span>
                </div>
                <p className="description">{props.event.description}</p>
                <div className="action">
                  {" "}
                  <a className="button btn-small" href="#">
                    BOOK
                  </a>{" "}
                  <a
                    className="button btn-small yellow popup-map"
                    href="#"
                    data-box="37.089072, -8.247880"
                  >
                    VIEW ON MAP
                  </a>{" "}
                </div>
              </div>
            </article>
          </li>
        </ul>
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
    return <div>{this.eventList()}</div>;
  }
}
