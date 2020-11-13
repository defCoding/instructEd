import React, { useState, useEffect } from 'react';
import { InputLabel, FormControl, Select, Paper, TextField, Grid, MenuItem, Menu } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
  const blankSearch = {search: '', filter: ''};
  const [values, setValues] = useState(blankSearch);

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
            <TextField color="secondary" variant="outlined" label="Search" name="search" onChange={handleInputChange} className={classes.items} />
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
                <MenuItem value='Classes'>Classes</MenuItem>
                <MenuItem value='Students'>Students</MenuItem>
                <MenuItem value='Instructors'>Instructors</MenuItem>
                <MenuItem value='Assignments'>Assignments</MenuItem>
                <MenuItem value='Announcements'>Announcements</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </form>
    </Paper>
  );
}