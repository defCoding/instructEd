import React, { useState } from 'react'
import { Link as MuiLink, Button, Typography, Grid, TextField, Paper } from '@material-ui/core';
import useForm from './useForm';
import { Link } from 'react-router-dom';

const initialValues = {
  userName: '',
  password: ''
}

export default function Login() {

  const {
    values,
    setValues,
    handleInputChange,
    useStyle
  } = useForm(initialValues);
  const classes = useStyle();
  const onSubmit = () => {
    console.log(values.state)
  };
  const preventDefault = (event) => event.preventDefault();

  return (
    <>
      <Paper className={classes.paper}>
        <form className={classes.root}>
          <Grid 
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            >
            <Grid item xs={12} className={classes.title}>
              <Typography
                variant="h1">
                Login
              </Typography>
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
                to="/Registration"
                variant="body1">
                Create account
              </MuiLink>
            </Grid>
            <Grid item 
              xs={12} 
              className={classes.link}>
              <MuiLink 
                component={Link}
                to="/ForgotPassword"
                variant="body1">
                Forgot password?
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  )
}
