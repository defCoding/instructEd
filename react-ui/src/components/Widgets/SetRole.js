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

export default function SetRole() {
  const classes = useStyle();
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

    return (
      <Paper className="root">
        <form>
          <Grid height="100%" spacing={1}>
            <Grid item xs="12">
              <TextField required color="secondary" variant="outlined" label="User" name="user" className={classes.items} />
            </Grid>
            <FormControl color="secondary" variant="outlined" className={classes.items}>
                <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                <Select
                  color="secondary"
                  style={{ width: 150 }}
                  value={role}
                  onChange={handleChange}
                  label="Role"
                >
                  <MenuItem value={10}>Admin</MenuItem>
                  <MenuItem value={20}>Instructor</MenuItem>
                  <MenuItem value={30}>Student</MenuItem>
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