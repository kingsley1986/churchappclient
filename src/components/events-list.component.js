import React from "react";

import { Link } from "react-router-dom";
import axios from "axios";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 950,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
});

class EventsList extends React.Component {
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={330} className={classes.gridList} spacing={8}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile>
          {this.state.events.map((tile) => (
            <GridListTile key={tile.eventImage}>
              <img src={tile.eventImage} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                    className={classes.icon}
                  ></IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(useStyles)(EventsList);
