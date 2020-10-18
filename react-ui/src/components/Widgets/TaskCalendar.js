import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemText, Paper, IconButton, Drawer, Divider, ListItem, Typography, Dialog, AppBar, Toolbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import moment from 'moment'

function AssignmentDialog({dateSelected, open, setOpen}) {
  const classes = useStyles();
  const [assignments, setAssignments] = useState([]);

  //Select class given given date
  useEffect(() => {
    if (dateSelected != null) {
      axios.get(`/courses/${selectedClass.id}/announcements`)
        .then(res => {
          console.log(res.data);
          setAnnouncements(res.data);
        })
        .catch(console.log);
      
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
          {dateSelected}
        </Typography>
      </Toolbar>
    </AppBar>
    <Paper className={classes.dialog}>
      <Typography variant="h6">
        Assignments
      </Typography>
      <List>
          {assignments.map(assignment => {
            let assignmentdate = moment(assignment.deadline).local();
            assignmentdate = date.format('[Due on] MM-DD-YY [at] h:mm A');

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
      <AssignmentDialog date={date} open={open} setOpen={setOpen} />
    </div>
  );
}
