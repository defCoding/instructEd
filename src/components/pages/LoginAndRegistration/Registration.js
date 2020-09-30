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
  confirmPassword: ''
}

export default function Registration() {

  const {
    values,
    setValues,
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
      <form>
        <Grid container>
          <Grid item xs={6}>
            <TextField variant="outlined" label="First Name" name="firstName" value={values.firstName} onChange={handleInputChange} className={classes.textFieldForm}/>
            <TextField variant="outlined" label="Last Name" name="lastName" value={values.lastName} onChange={handleInputChange} className={classes.textFieldForm}/>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </form>
    </>
  )
}


/*
<Grid item xs={11}>
              <Typography
                variant="h1">
                Create Account
              </Typography>
            </Grid>
            <Grid item
              xs={6}
              className={classes.form}>
            <TextField
              variant="outlined"
              label="First Name"
              name="firstName"
              className={classes.form}
              value={values.firstName}
              onChange={handleInputChange}
            />
            <TextField 
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={values.lastName}
              className={classes.form}
              onChange={handleInputChange}
            />
            <TextField 
              variant="outlined"
              label="Email"
              name="email"
              value={values.email}
              className={classes.form}
              onChange={handleInputChange}
            />
            <TextField 
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              value={values.password}
              className={classes.form}
              onChange={handleInputChange}
            />
            <TextField 
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              className={classes.form}
              onChange={handleInputChange}
            />
            </Grid>
            <Grid item 
              xs={12} 
              className={classes.submit}>
              <Button
                variant="contained"
                size="large"
                onClick={onSubmit}>
                Submit
              </Button>
            </Grid>
            <Grid item 
              xs={12} 
              className={classes.link}>
              <MuiLink 
                component={Link}
                to="/Login"
                variant="body1"
                color="secondary">
                Already have an account?
              </MuiLink>
            </Grid>
*/