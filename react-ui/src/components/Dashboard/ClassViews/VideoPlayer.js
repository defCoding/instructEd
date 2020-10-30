import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent } from '@material-ui/core';
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
  const handleClose = () => {
    props.setOpen(false);
  };

  return(
    <>
      <Dialog 
        open={props.open} 
        onClose={handleClose}
        PaperProps ={{
          classes: {
           root: classes.paper
          }
        }}>
        <DialogContent>
          <ReactPlayer 
            controls='true'
            url={props.videoFile}
            width="580px"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}