import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemText, Paper, IconButton, Drawer, Divider, ListItem, Typography, Dialog, AppBar, Toolbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import moment from 'moment';

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

function AssignmentDialog({dateSelected, open, setOpen}) {
  const classes = useStyles();
  const dateSelectedString = dateSelected.toDateString();
  const [assignments, setAssignments] = useState([]);

  //Select class given given date
  useEffect(() => {
    if (dateSelected != null) {
      axios.get(`/courses/${dateSelected}/assignments`)
        .then(res => {
          setAssignments(res.data);
        })
        .catch(console.log);
    }
  }, [dateSelected]);

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
          {dateSelectedString}
        </Typography>
      </Toolbar>
    </AppBar>
    <Paper className={classes.dialog}>
      <Typography variant="h6">
        Assignments:
      </Typography>
      <List>
          {assignments.map(assignment => {
            let assignmentdate = moment(assignment.deadline).local();
            assignmentdate = assignmentdate.format('[Due on] MM-DD-YY [at] h:mm A');

            return (
              <ListItem>
                <ListItemText primary={assignment.assignment_name} secondary={assignmentdate} />
              </ListItem>
            );
          })}
      </List>
    </Paper>
  </Dialog>
  );
}

export default function TaskCalendar() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);


  //const onChange = date => {
    //setDate(date);
  //};

  const onClickDay = date => {
    setOpen(true);
    setDate(date);

  }

  return (
    <div>
      <Calendar
        //onChange={onChange}
        onClickDay={onClickDay}
        value={date}
      />
      <AssignmentDialog dateSelected={date} open={open} setOpen={setOpen} />
    </div>
  );
}
