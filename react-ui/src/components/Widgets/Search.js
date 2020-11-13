import React, { useState, useEffect } from 'react';
import { InputLabel, FormControl, Select, Paper, TextField, Grid, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const adminSearch = ['All Users', 'Classes', 'Instructors', 'Students'];
const studentSearch = ['Announcements', 'Assignments', 'Files'];
const instructorSearch = ['Announcements', 'Assignments', 'Files'];
let currentSearch = [];

const ITEM_HEIGHT = 50;

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
  const blankSearch = {name: '', class: '', filter: ''};
  const [values, setValues] = useState(blankSearch);

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
            break;
          default:
            throw new Error('Invalid role.');
        }
      })
      .catch(err => {
        console.log(err);
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
            <TextField color="secondary" variant="outlined" label="Name" name="name" onChange={handleInputChange} />
          </Grid>
          <Grid item xs="12">
            <TextField color="secondary" variant="outlined" label="Class" name="class" onChange={handleInputChange} />
          </Grid>
          <FormControl color="secondary" variant="outlined" className={classes.items}>
            <InputLabel>Filter</InputLabel>
            <Select
                color="secondary"
                style={{ width: 150 }}
                onChange={handleInputChange}
                label="Filter"
                name="filter"
              >
              {currentSearch.map((current) => (
                <MenuItem key={current} value={current} >
                  {current}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </form>
    </Paper>
  );
}