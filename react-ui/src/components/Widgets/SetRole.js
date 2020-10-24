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

export default function SetRole() {
  const classes = useStyle();
  const blankRole = { userID: '', role: '' };
  const [values, setValues] = useState(blankRole);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const onClick = e => {
    e.preventDefault();
    axios.put('/roles', values)
      .then(res => {
        if (res.status === 200) {
          alert('Role changed successfully.');
        }
      })
      .catch(err => {
        alert(err.response.data);
      });
  }

  return (
    <Paper className="root">
      <form>
        <Grid height="100%" spacing={1}>
          <Grid item xs="12">
            <TextField required color="secondary" variant="outlined" label="User ID" name="userID" className={classes.items} onChange={handleInputChange} />
          </Grid>
          <FormControl color="secondary" variant="outlined" className={classes.items}>
            <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
            <Select
              color="secondary"
              style={{ width: 150 }}
              onChange={handleInputChange}
              label="Role"
              name="role"
            >
              <MenuItem value={'admin'}>Admin</MenuItem>
              <MenuItem value={'instructor'}>Instructor</MenuItem>
              <MenuItem value={'student'}>Student</MenuItem>
            </Select>
          </FormControl>
          <Grid item xs="12">
            <Button variant="contained" color="secondary" className={classes.items} onClick={onClick}>Set Role</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}