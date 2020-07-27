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
  contentContainer: {
    // width: "100%",
    // [theme.breakpoints.down("md")]: {
    //   maxWidth: "85%",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   display: "grid",
    //   gridTemplateColumns: "fr",
    // },
  },

  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 1000,
    height: "auto",
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
        <GridListTile key="Subheader" style={{ height: "auto" }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        <GridList
          cellHeight={330}
          cols={3}
          className={classes.gridList}
          spacing={8}
        >
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
