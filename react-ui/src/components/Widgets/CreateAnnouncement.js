import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, Paper, TextField, Grid, Button, IconButton, Menu, MenuItem, Typography, Toolbar } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const ITEM_HEIGHT = 50;

const useStyle = makeStyles(theme => ({
  items: {
    margin:theme.spacing(1),
    paddingRight: theme.spacing(2)
  },
  /*
  root: {
    '& .MuiFormControl-root': {
      width:'75%',
      margin:theme.spacing(1),
      display:'flex'
    }
  },
  */
}))

export default function CreateAnnouncement() {
  const classes = useStyle();
  const noCourse = {course_id: undefined, course_name: 'Select a Course', course_term: ''};
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(noCourse);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [values, setValues] = useState({announcementName: '', description: ''});

  const handleInputChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name] : value
    });
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose(course) {
    setAnchorEl(null);
    setCurrentCourse(course);
  }

  const handleCourseChange = (event) => {
    setCurrentCourse(event.target.value);
  }

  const getCurrentCourseName = () => {
    return currentCourse.course_name;
  }

  const onClick = (e) => {
    e.preventDefault();
    if (currentCourse.course_id && values.announcementName !== '' && values.description !== '') {
      axios.post('/announcements', {
        ...values,
        courseID: currentCourse.course_id
      }).then(res => {
        if (res.status === 201) {
          alert('Announcement created!');
          setValues({announcementName: '', description: ''});
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
    <Paper className={classes.root}>
      <form>
        <Grid height="100%" spacing={1} classname={classes.items}>
          <Grid item xs="12">
          <FormControl color="secondary" variant="outlined" className={classes.items} fullWidth>
          <InputLabel>Course</InputLabel>
          <Select
              color="secondary"
              displayEmpty={true}
              onChange={handleCourseChange}
              value={currentCourse}
              renderValue={getCurrentCourseName}
              label="Course"
              name="course"
              required
            >
                {courses.map((course) => (
                  <MenuItem 
                    key={course.course_name} 
                    value={course}>
                    {course.course_name}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
          </Grid>
          <Grid item xs="12">
            <TextField className={classes.items} color="secondary" variant="outlined" label="Announcement Title" value={values.announcementName} name="announcementName" onChange={handleInputChange} fullWidth/>
          </Grid>
          <Grid item xs="12">
            <TextField className={classes.items} color="secondary" multiline="true" variant="outlined" label="Description" value={values.description} name="description" onChange={handleInputChange} rows="4" fullWidth/>
          </Grid>
          <Grid item xs="12" classname={classes.items}>
            <Button className={classes.items} variant="contained" color="secondary" onClick={onClick}>Post Announcement</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}