import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GridList from "@material-ui/core/GridList";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "react-router-dom";

import moment from "moment";

export default function EventsList() {
  const theme = useTheme();
  const [tileData, setTileData] = useState([]);
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "auto",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      <GridList
        cellHeight={420}
        className={classes.gridList}
        spacing={12}
        cols={matches ? 1 : 3}
      >
        {tileData.map((name, key) => {
          return (
            <Card
              component={Link}
              to={"/events/" + name._id + "/eventcomments"}
              key={Math.floor(Math.random() * new Date().getTime())}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={name.title}
                subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.media}
                image={name.eventImage}
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {name.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography paragraph>{name.description}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
        ;
      </GridList>
    </div>
  );
}
