import React, { useState } from 'react';
import { Paper, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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


export default function AddCourse() {
  const classes = useStyle();
  const blankCourse = {courseName: '', courseNumber: '', courseDept: '', instructorID: '', courseTerm: ''};
  const [values, setValues] = useState(blankCourse);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name] : value
    });
  }

  const onClick = (e) => {
    e.preventDefault();
    axios.get('/roles')
      .then(res => {
        if (res.data === 'admin') {
          console.log(values);
          axios.post('/courses', values)
            .then(res => {
              if (res.status === 201) {
                alert('Course created!');
              }
            })
            .catch(console.log);
        }
      })
      .catch(console.log);
  };

  return (
    <Paper className="root">
      <form>
        <Grid height="100%" spacing={1}>
          <Grid item xs="12">
            <TextField color="secondary" variant="outlined" label="Class Name" name="courseName" className={classes.items} onChange={handleInputChange} />
          </Grid>
          <Grid item xs="12">
            <TextField color="secondary" variant="outlined" label="Class Number" name="courseNumber" className={classes.items} onChange={handleInputChange} />
          </Grid>
          <Grid item xs="12">
            <TextField color="secondary" variant="outlined" label="Department" name="courseDept" className={classes.items} onChange={handleInputChange} />
          </Grid>
          <Grid item xs="12">
            <TextField color="secondary" variant="outlined" label="Instructor ID" name="instructorID" className={classes.items} onChange={handleInputChange} />
          </Grid>
          <FormControl color="secondary" variant="outlined" className={classes.items}>
            <InputLabel id="demo-simple-select-outlined-label">Term</InputLabel>
            <Select
              color="secondary"
              style={{ width: 150 }}
              onChange={handleInputChange}
              label="Term"
              name="courseTerm"
            >
              <MenuItem value={'SP21'}>Spring 2021</MenuItem>
              <MenuItem value={'FA21'}>Fall 2021</MenuItem>
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