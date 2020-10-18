import React from 'react';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const classFields = {
  className: '',
  department: '',
  classNumber: '',
  instructorEmail: '',
}

const useStyle = makeStyles(theme => ({
  items: {
    margin:theme.spacing(1)
  },
}))

const onSubmit = (e) => {
  e.preventDefault();

};

export default function AddCourse() {
  const classes = useStyle();

    return (
      <Paper>
        <form>
          <Grid height="100%" spacing={1}>
            <Grid item xs="12">
              <TextField color="secondary" variant="outlined" label="Class Name" name="className" className={classes.items} />
            </Grid>
            <Grid item xs="12">
              <TextField color="secondary" variant="outlined" label="Class Number" name="classNumber" className={classes.items} />
            </Grid>
            <Grid item xs="12">
              <TextField color="secondary" variant="outlined" label="Department" name="department" className={classes.items} />
            </Grid>
            <Grid item xs="12">
              <TextField color="secondary" variant="outlined" label="Instructor Email" name="instructorEmail" className={classes.items} />
            </Grid>
            <FormControl color="secondary" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
                <Select
                  color="secondary"
                  value={filter}
                  onChange={handleChange}
                  label="Term"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Spring 2021</MenuItem>
                  <MenuItem value={20}>Fall 2021</MenuItem>
                </Select>
              </FormControl>
            <Grid item xs="12">
              <Button variant="contained" color="secondary" className={classes.items} onSubmit={onSubmit}>Add Course </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
}