import { Link as MuiLink, Paper, Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react'
import useForm from './useForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  securityQuestion1: '',
  securityAnswer1: '',
  securityQuestion2: '',
  securityAnswer2: ''
}

export default function Registration() {

  const {
    values,
    handleInputChange,
    useStyle
  } = useForm(initialValues);
  const classes = useStyle();

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      window.alert("Password is not the same");
    } 
    else {
      axios.post('/', values.state);
      console.log(values.state);
    }
  };

  return (
    <>
      <Navbar />
      <Paper className={classes.paperContent}>
        <form className={classes.root}>
          <Grid container justify="center">
            <Typography variant="h2" color="primary" className={classes.extraItemsForm}>Create Account</Typography>
          </Grid>
          <Grid container justify="center">
            <TextField variant="outlined" label="First Name" name="firstName" value={values.firstName} onChange={handleInputChange} className={classes.textFieldForm}/>
            <TextField variant="outlined" label="Last Name" name="lastName" value={values.lastName} onChange={handleInputChange} className={classes.textFieldForm}/>
            <TextField variant="outlined" label="Email" name="email" value={values.email} onChange={handleInputChange} className={classes.textFieldForm} />
            <TextField variant="outlined" label="Password" name="password" type="password" value={values.password} onChange={handleInputChange} className={classes.textFieldForm} />
            <TextField variant="outlined" label="Confirm Password" name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleInputChange} className={classes.textFieldForm} />
          </Grid>
          <Grid container justify="center">
            <Button variant="contained" size="large" color="primary" onClick={onSubmit} className={classes.extraItemsForm}>Submit</Button>
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/login" variant="body1" color="primary" className={classes.extraItemsForm}>Already have an account?</MuiLink>
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/forgotpassword" variant="body1" color="primary" className={classes.extraItemsForm}>Forgot password?</MuiLink>
          </Grid>
        </form>
      </Paper>
    </>
  )
}
