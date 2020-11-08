import React, { useState, useEffect } from 'react';
import { Paper, TextField, Grid, Button, IconButton, Menu, MenuItem, Typography, Toolbar } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CalendarDialog from './CalendarDialog';

const ITEM_HEIGHT = 50;

const useStyle = makeStyles(theme => ({
  items: {
    margin: theme.spacing(1)
  },
}))

export default function CreateAssignment() {
  const classes = useStyle();
  const noCourse = {course_id: undefined, course_name: 'None', course_term: ''};
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(noCourse);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cOpen, setCopen] = React.useState(false);
  const open = Boolean(anchorEl);
  const [assignmentName, setAssignmentName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date(Date.now()));
  const [time, setTime] = React.useState('');

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  }

  const handleAssignmentChange = e => {
    setAssignmentName(e.target.value);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose(course) {
    setAnchorEl(null);
    setCurrentCourse(course);
  }

  function selectDueDateClicked() {
    setCopen(true);
  }

  const onClick = (e) => {
    e.preventDefault();
    if (currentCourse.course_id && assignmentName !== '' && description !== '' && date !== null && time !== '') {
      axios.post('/assignments', {
        assignmentName,
        description,
        date,
        time,
        courseID: currentCourse.course_id
      }).then(res => {
        if (res.status === 201) {
          alert('Assignment created!');
          setAssignmentName('');
          setDescription('');
          setDate(new Date(Date.now()));
          setTime('');
        }
      });
    } else {
      alert('All fields must be filled.');
    }
  };

  useEffect(() => {
    axios.get('/roles')
      .then(res => {
        switch (res.data) {
          case 'admin':
            axios.get('/courses').then(res => setCourses(res.data));
            break;
          case 'instructor':
          case 'student':
            axios.get('/courses/instructor').then(res => setCourses(res.data));
            break;
          default:
            throw new Error('Invalid role.');
        }
      })
      .catch(console.log);
  }, []);


  return (
    <Paper>
      <form>
        <Grid height="100%" spacing={1}>
          <Grid item xs="12">
            <Typography align="left" variant="h6" color="inherit">
            Course Name
            </Typography>
          </Grid>
          <Grid item xs="12">
            <Toolbar variant="dense">
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={() => handleClose(noCourse)}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}>
                {courses.map((course) => (
                  <MenuItem 
                    key={course.course_name} 
                    selected={course === currentCourse} 
                    onClick={() => handleClose(course)}>
                    {course.course_name}
                  </MenuItem>
                ))}
              </Menu>
              <Typography align="right" variant="h6" color="inherit">
                {currentCourse.course_name}
              </Typography>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="secondary"
              >
                <ArrowDropDownIcon />
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item xs="12">
            <TextField className={classes.items} color="secondary" variant="outlined" label="Assignment Name" value={assignmentName} name="assignmentName" onChange={handleAssignmentChange} />
          </Grid>
          <Grid item xs="12">
            <TextField className={classes.items} color="secondary" multiline="true" variant="outlined" label="Description" value={description} name="description" onChange={handleDescriptionChange} />
          </Grid>
          <Grid item xs="12">
            <Button className={classes.items} variant="contained" color ="primary" onClick={selectDueDateClicked}>Select Due Date</Button>
            <Typography variant="b2" component="b2">
              {date + " at " + time}
            </Typography>
          </Grid>
          <Grid item xs="12">
            <Button className={classes.items} variant="contained" color="secondary" onClick={onClick}>Post Assignment</Button>
          </Grid>
        </Grid>
      </form>
      <CalendarDialog setOpen={setCopen} open={cOpen} time={time} setTime={setTime} date={date} setTime={setDate} />
    </Paper>
  );
}