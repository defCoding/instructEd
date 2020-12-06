import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import ReactPlayer from 'react-player';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden"
  },
}));

export default function VideoPlayer(props) {
  const classes = useStyles();

  return(
    <>
      <div>
        <ReactPlayer 
          controls={true}
          url={props.videoFile ? props.videoFile.url : ''}
          width="580px"
        />
      </div>
    </>
  );
}