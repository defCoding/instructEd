import React, { useState, useEffect } from 'react';
import { Paper, TextField, Grid, Button, IconButton, Menu, MenuItem, Typography, Toolbar, Divider } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Calendar from 'react-calendar';

const ITEM_HEIGHT = 50;

const useStyle = makeStyles(theme => ({
  items: {
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2)
  },
}))

export default function CreateAssignment() {
  const classes = useStyle();
  const noCourse = {course_id: undefined, course_name: 'None', course_term: ''};
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(noCourse);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tAnchorEl, setTAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const topen = Boolean(tAnchorEl);
  const [assignmentName, setAssignmentName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date(Date.now()));
  const [time, setTime] = React.useState('');
  const [dateString, setDateString] = React.useState(date.toDateString());
  const [amOrPM, setAmOrPM] = React.useState('PM');

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  }

  const handleAssignmentChange = e => {
    setAssignmentName(e.target.value);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTClick = (event) => {
    setTAnchorEl(event.currentTarget);
  }

  function handleCloseCourse(course) {
    setAnchorEl(null);
    setCurrentCourse(course);
  }

  function handleCloseTime(timeOfDay){
    setTAnchorEl(null);
    setAmOrPM(timeOfDay);
  }

  const handleTimeChange = e => {
    setTime(e.target.value);
  }

  const onClickDayCD = day => {
    setDate(day);
    setDateString(date.toDateString());
    console.log(date.toDateString());
  }

  const onClick = (e) => {
    //e.preventDefault();
    if (currentCourse.course_id && assignmentName !== '' && description !== '' && date !== '' && time !== '') {
      let hour = Number(time.split(':')[0]);
      let minute = Number(time.split(':')[1]);
      if(hour < 0 || hour > 12 || minute < 0 || minute > 59){
        alert("Hours must be between 0-12, minutes must be between 0-59.");
      }
      else {
        if(amOrPM == 'PM'){
          hour = hour + 12;
        }
        date.setHours(hour);
        date.setMinutes(minute);
        console.log(date.toDateString());
      axios.post('/assignments', {
        assignmentName,
        description,
        courseID: currentCourse.course_id,
        date
      }).then(res => {
        if (res.status === 201) {
          alert('Assignment created!');
          setAssignmentName('');
          setDescription('');
          setDate(new Date(Date.now()));
          setTime('');
        }
      }); 
    }
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
                id="course-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={() => handleCloseCourse(noCourse)}
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
                    onClick={() => handleCloseCourse(course)}>
                    {course.course_name}
                  </MenuItem>
                ))}
              </Menu>
              <Typography align="right" variant="h6" color="inherit">
                {currentCourse.course_name}
              </Typography>
              <IconButton
                aria-label="more"
                aria-controls="course-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="secondary"
              >
                <ArrowDropDownIcon />
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item xs="12">
            <TextField className={classes.items} color="secondary" variant="outlined" label="Assignment Name" value={assignmentName} name="assignmentName" onChange={handleAssignmentChange} fullWidth/>
          </Grid>
          <Grid item xs="12">
            <TextField className={classes.items} color="secondary" multiline="true" variant="outlined" label="Description" value={description} name="description" onChange={handleDescriptionChange} rows="4" fullWidth/>
          </Grid>
          <Grid item xs="12">
          <Calendar
            //onChange={onChange}
            onClickDay={onClickDayCD}
            value={date}
            />
          </Grid>
          <Grid item xs="12">
            <TextField className={classes.items} color="secondary" multiline="true" variant="outlined" label="Time" value={time} name="time" onChange={handleTimeChange}  fullWidth/>
            <Toolbar variant="dense">
              <Menu
                id="time-menu"
                anchorEl={tAnchorEl}
                keepMounted
                open={topen}
                onClose={() => handleCloseTime(amOrPM)}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}>
                
                  <MenuItem 
                    key={'AM'} 
                    selected={'AM' === amOrPM} 
                    onClick={() => handleCloseTime('AM')}>AM
                  </MenuItem>

                <MenuItem 
                  key={'PM'} 
                  selected={'PM' === amOrPM} 
                  onClick={() => handleCloseTime('PM')}>PM
                </MenuItem>
                
              </Menu>
              <Typography align="right" variant="h6" color="inherit">
                {amOrPM}
              </Typography>
              <IconButton
                aria-label="more"
                aria-controls="time-menu"
                aria-haspopup="true"
                onClick={handleTClick}
                color="secondary"
              >
                <ArrowDropDownIcon />
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item xs="12">
            <Typography className={classes.items} variant="body2" component="body2">
              {dateString + " at " + time + " " + amOrPM}
            </Typography>
          </Grid>
          <Grid item xs="12">
            <Button className={classes.items} variant="contained" color="secondary" onClick={onClick}>Post Assignment</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}