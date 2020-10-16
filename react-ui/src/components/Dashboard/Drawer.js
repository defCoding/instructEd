import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemText, Paper, IconButton, Drawer, Divider, ListItem, Typography, Dialog, AppBar, Toolbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.secondary.main,
  },
  appBar: {
    position: 'relative',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  dialog: {
    padding: theme.spacing(3),
    height: "100vh",
  }
}));

function ClassDialog({selectedClass, open, setOpen}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {selectedClass}
        </Typography>
      </Toolbar>
    </AppBar>
    <Paper className={classes.dialog}>
      <Typography variant="h6">
        Announcements
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Announcement 1 Title" secondary="Announcement 1 Body" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Announcement 2 Title" secondary="Announcement 2 Body" />
        </ListItem>
      </List>
      <Typography variant="h6">
        Assignments
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Assignment 1 Title" secondary="Assignment 1 Body" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Assignment 2 Title" secondary="Assignment 2 Body" />
        </ListItem>
      </List>
    </Paper>
  </Dialog>
  );
}

export default function CurrentDrawer() {
  const getRegisteredClasses = ['firstClass', 'secondClass', 'thirdClass'];
  const [selectedClass, setSelectedClass] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {getRegisteredClasses.map((text) => (
            <ListItem button key={text} onClick={() => {
              setOpen(true);
              setSelectedClass(text);
            }}>
              <Typography color='primary'>{text}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <ClassDialog selectedClass={selectedClass} open={open} setOpen={setOpen} />
    </div>
  );
}
