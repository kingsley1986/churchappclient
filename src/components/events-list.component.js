import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

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

  render() {
    return (
      <div
        className="root"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        <GridList
          cellHeight={330}
          className="gridlist"
          style={{ width: "500", height: "450" }}
          spacing={8}
        >
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile>
          {this.state.events.map((tile) => (
            <GridListTile key={tile.eventImage}>
              <img src={tile.eventImage} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                titlePosition="top"
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                    className="icon"
                    style={{ color: "rgba(255, 255, 255, 0.54)" }}
                  ></IconButton>
                }
              />
              <GridListTileBar subtitle={<span></span>} />
              <GridListTileBar
                subtitle={<span>From: {tile.startingDate}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}
