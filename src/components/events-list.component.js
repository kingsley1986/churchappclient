import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function EventsList() {
  const theme = useTheme();
  const [tileData, setTileData] = useState([]);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      // width: 500,
      height: "auto",
    },
  }));
  useEffect(() => {
    axios
      .get("http://localhost:9000/events/")
      .then((response) => {
        setTileData([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridListTile key="Subheader" style={{ height: "auto" }}>
        <ListSubheader component="div">This is List of Events</ListSubheader>
      </GridListTile>
      <GridList
        cellHeight={330}
        cols={matches ? 1 : 3}
        className={classes.gridList}
        spacing={12}
      >
        {tileData.length > 0 &&
          tileData.map((tile, index) => {
            return (
              <GridListTile
                key={Math.floor(Math.random() * new Date().getTime())}
              >
                <img src={tile.eventImage} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>by: {tile.author}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${tile.title}`}
                      className={classes.icon}
                    />
                  }
                />
              </GridListTile>
            );
          })}
      </GridList>
    </div>
  );
}
