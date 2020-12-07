import React, { useState } from 'react';
import { Paper, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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

export default function AddToClass() {
  const classes = useStyle();
  const blankAdd = {courseID: '', userID: '', role: ''};
  const [values, setValues] = useState(blankAdd);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  const onClick = e => {
    e.preventDefault();
    console.log(values);
    switch (values.role) {
      case 'Instructor':
        axios.post('/instructing', values)
          .then(res => {
            if (res.status === 201) {
              alert(res.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
        break;
      case 'Student':
        axios.post('/enrollments', values)
          .then(res => {
            if (res.status === 201) {
              alert(res.data);
            }
          })
          .catch(err => {
            alert(err.response.data);
          });
        break;
      default:
        alert('Role not provided.')
        break;
    }
  }

  return (
    <Paper className="root">
      <form>
        <Grid height="100%" spacing={1}>
          <Grid item xs="12">
            <TextField required color="secondary" variant="outlined" label="Course ID" name="courseID" className={classes.items} onChange={handleInputChange}/>
          </Grid>
          <Grid item xs="12">
            <TextField required color="secondary" variant="outlined" label="User ID" name="userID" className={classes.items} onChange={handleInputChange}/>
          </Grid>
          <FormControl color="secondary" variant="outlined" className={classes.items}>
            <InputLabel id="demo-simple-select-outlined-label">Role in Class</InputLabel>
            <Select
              color="secondary"
              style={{ width: 150 }}
              onChange={handleInputChange}
              label="Role in Class"
              name="role"
            >
              <MenuItem value={'Instructor'}>Instructor</MenuItem>
              <MenuItem value={'Student'}>Student</MenuItem>
            </Select>
          </FormControl>
          <Grid item xs="12">
            <Button variant="contained" color="secondary" className={classes.items} onClick={onClick}>Add to Class</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}