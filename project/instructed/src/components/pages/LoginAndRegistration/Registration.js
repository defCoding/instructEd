import { Link as MuiLink, Paper, Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react'
import useForm from './useForm';
import axios from 'axios';
import { Link } from 'react-router-dom';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
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
      <Paper className={classes.paper}>
        <form className={classes.root}>
          <Grid 
            container
            direction="column"
            justify="flex-start"
            alignItems="center">
            <Grid item 
              xs={12} 
              className={classes.title}>
              <Typography
                variant="h1">
                Registration
              </Typography>
            </Grid>
            <Grid item 
              xs={12}
              className={classes.form}>
              <TextField
                variant="outlined"
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item 
              xs={12}
              className={classes.form}>
              <TextField 
                variant="outlined"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item 
              xs={12}
              className={classes.form}>
              <TextField 
                variant="outlined"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item 
              xs={12}
              className={classes.form}>
              <TextField 
                variant="outlined"
                label="Username"
                name="userName"
                value={values.userName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item 
              xs={12}
              className={classes.form}>
              <TextField 
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item 
              xs={12}
              className={classes.form}>
              <TextField 
                variant="outlined"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item 
              xs={12} 
              className={classes.submit}>
              <Button
                variant="contained"
                color="primary"
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
                variant="body1">
                Already have an account?
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  )
}
