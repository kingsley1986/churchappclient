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
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import moment from "moment";

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
                component={Link}
                to={"/events/" + tile._id + "/eventcomments"}
                key={Math.floor(Math.random() * new Date().getTime())}
              >
                <img src={tile.eventImage} alt={tile.title} />
                <GridListTileBar titlePosition="top" />
                <GridListTileBar
                  titlePosition="top"
                  title={tile.title}
                  style={{ fontSize: "9px" }}
                />
                <GridListTileBar
                  style={{
                    marginBottom: "60px",
                  }}
                />
                <GridListTileBar
                  title={moment(tile.startingDate).format("LLLL")}
                  style={{
                    marginBottom: "60px",
                  }}
                />
                <GridListTileBar />
                <GridListTileBar
                  title={moment(tile.closingDate).format("LLLL")}
                />
              </GridListTile>
            );
          })}
      </GridList>
    </div>
  );
}
