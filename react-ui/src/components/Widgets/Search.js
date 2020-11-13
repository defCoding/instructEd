import React, { useState } from 'react';
import { Paper, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const adminSearch = ['All Users', 'Classes', 'Instructors', 'Students'];
const studentSearch = ['Announcements', 'Assignments', 'Files'];
const instructorSearch = ['Announcements', 'Assignments', 'Files'];
let currentSearch = [];

const useStyle = makeStyles(theme => ({
  items: {
    margin: theme.spacing(1)
  },
  root: {
    '& .MuiFormControl-root': {
      width: '75%',
      margin: theme.spacing(1),
      display: 'flex'
    }
  },
}))


export default function Search() {
  const classes = useStyle();
  const blankCourse = {courseName: '', courseNumber: '', courseDept: '', instructorID: '', courseTerm: ''};
  const [values, setValues] = useState(blankCourse);

  useEffect(() => {
    axios.get('/roles')
      .then(res => {
        switch (res.data) {
          case 'admin':
            currentSearch = adminSearch;
            break;
          case 'instructor':
            currentSearch = instructorSearch;
            break;
          case 'student':
            currentSearch = studentSearch;
            if (!coursesRef.current.empty) {
              currentSearch = instructorWidgets;
            }
            break;
          default:
            throw new Error('Invalid role.');
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) { 
          props.history.push('/login');
        } else {
          console.log(err);
        }
      });
  }, []);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name] : value
    });
  }

  return (
    <Paper className="root">
      <form>
        <Grid height="100%" spacing={1}>
          <Grid item xs="12">
            <TextField required color="secondary" variant="outlined" label="Name" name="name" onChange={handleInputChange} />
          </Grid>
          <Grid item xs="12">
          <TextField required color="secondary" variant="outlined" label="Class" name="class" onChange={handleInputChange} />
          </Grid>
          <FormControl color="secondary" variant="outlined" className={classes.items}>
            <InputLabel>Filter</InputLabel>
            <Select
              color="secondary"
              style={{ width: 150 }}
              onChange={handleInputChange}
              label="Filter"
              name="searchFilter"
            >
            {currentSearch.map((current) => (
              <MenuItem key={current}
                selected={current === currentFilter} 
                onClick={() => handleClose(current)}>
                {current}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
          <Grid item xs="12">
            <Button variant="contained" color="secondary" className={classes.items} onClick={onClick}>Add Course</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}