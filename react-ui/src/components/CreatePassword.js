import React from 'react'
import { Link as Button, Typography, Grid, TextField, Paper } from '@material-ui/core';
import useForm from './useForm';
import Navbar from './Navbar';

const initialValues = {
  password: '',
  confirmPassword: ''
}

export default function Login() {
  
  const {
    values,
    handleInputChange,
    useStyle
  } = useForm(initialValues);
  const classes = useStyle();
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log("approved");
    }
    else {
      console.log("error - passwords don't match");
    }
  };

  return (
    <>
      <Navbar />
      <Paper className={classes.paperContent}>
        <form className={classes.root}>
          <Grid container justify="center">
            <Typography variant="h2" color="primary" className={classes.extraItemsForm}>Create New Password</Typography>
          </Grid>
          <Grid container justify="center">
            <TextField variant="outlined" label="New Password" name="password" type="password" value={values.password} onChange={handleInputChange} className={classes.textFieldForm} />
            <TextField variant="outlined" label="Confirm Password" name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleInputChange} className={classes.textFieldForm} />
          </Grid>
          <Grid container justify="center">
            <Button variant="contained" size="large" color="primary" onClick={onSubmit} className={classes.extraItemsForm}>Submit</Button>
          </Grid>
        </form>
      </Paper>
    </>
  )
}
