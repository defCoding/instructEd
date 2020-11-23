import React from 'react';
import { List, Drawer, Dialog, AppBar, Toolbar, Typography, IconButton, ListItemText, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 200;

var messages = [{"id": "Contact 1", "body": "Message from contact 1"}, 
                {"id": "Contact 2", "body": "Message from contact 2"},
                {"id": "Contact 3", "body": "Message from contact 3"}, 
                {"id": "Contact 4", "body": "Message from contact 4"}];

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.secondary.main,
  },
  appBar: {
    position: "relative",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export default function Chat({ open, setOpen }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6"s>
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {messages.map(message => (
            <ListItem button>
              <ListItemText primary={message.id} secondary={message.body}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Dialog>
  );
}