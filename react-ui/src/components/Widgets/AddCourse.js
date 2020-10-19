import React from 'react';
import { Paper, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  items: {
    margin:theme.spacing(1)
  },
  root: {
    '& .MuiFormControl-root': {
      width:'75%',
      margin:theme.spacing(1),
      display:'flex'
    }
  },
}))

const onSubmit = (e) => {
  e.preventDefault();
};

export default function AddCourse() {
  const classes = useStyle();
  const [term, setTerm] = React.useState('');

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

    return (
      <Paper className="root">
        <form>
          <Grid height="100%" spacing={1}>
            <Grid item xs="12">
              <TextField required color="secondary" variant="outlined" label="Class Name" name="className" className={classes.items} />
            </Grid>
            <Grid item xs="12">
              <TextField required color="secondary" variant="outlined" label="Class Number" name="classNumber" className={classes.items} />
            </Grid>
            <Grid item xs="12">
              <TextField required color="secondary" variant="outlined" label="Department" name="department" className={classes.items} />
            </Grid>
            <Grid item xs="12">
              <TextField required color="secondary" variant="outlined" label="Instructor Email" name="instructorEmail" className={classes.items} />
            </Grid>
            <FormControl color="secondary" variant="outlined" className={classes.items}>
                <InputLabel id="demo-simple-select-outlined-label">Term</InputLabel>
                <Select
                  color="secondary"
                  style={{ width: 150 }}
                  value={term}
                  onChange={handleChange}
                  label="Term"
                >
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