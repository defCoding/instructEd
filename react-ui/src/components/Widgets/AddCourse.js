import React from 'react';
import { Paper, TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const classFields = {
  className: '',
  department: '',
  classNumber: '',
  instructor: '',
}

const useStyle = makeStyles(theme => ({
  items: {
    margin:theme.spacing(1)
  },
}))

export default function Announcements() {
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
              <TextField color="secondary" variant="outlined" label="Instructor" name="instructor" className={classes.items} />
            </Grid>
            <Grid item xs="12">
              <Button variant="contained" color="secondary" className={classes.items} >Add Course </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
}