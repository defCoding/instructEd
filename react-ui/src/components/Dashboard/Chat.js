import React from 'react';
import { Dialog AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  window: {
    position: 'absolute',
    bottom: theme.spacing(7),
    right: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export default function Chat({ openChat, setChatOpen }) {
  const classes = useStyles();

  const closeChat = () => {
    setChatOpen(false);
  }

  if (openChat) {
    return (
      <Dialog fullScreen open={openChat}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" color="inherit" onClick={closeChat} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6"s>
              Chat
            </Typography>
          </Toolbar>
        </AppBar>
      </Dialog>
    );
  }
  else {
    return (
      <div>
      </div>
    )
  }
}