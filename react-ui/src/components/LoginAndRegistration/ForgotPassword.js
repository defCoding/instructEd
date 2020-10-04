import React, { Component } from 'react';
import axios from 'axios';
import { Link as MuiLink, Button, Typography, Grid, TextField, Paper } from '@material-ui/core';
import useForm from './useForm';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const initialValues = {
  email: ''
}

export default function ForgotPassword() {

  const {
    values,
    handleInputChange,
    useStyle
  } = useForm(initialValues);
  const classes = useStyle();

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/forgotPassword', values)
      .then(res => {
        if (res.status === 200) {
          alert(res.data);
        }
      }).catch(err => {
        alert(err.response.data);
      });
  };

  return(
    <>
      <Navbar />
      <Paper className={classes.paperContent}>
        <form className={classes.root}>
          <Grid container justify="center">
            <Typography variant="h2" color="primary" className={classes.extraItemsForm}>Forgot Password</Typography>
          </Grid>
          <Grid container justify="center">
            <TextField variant="outlined" label="Email" name="email" value={values.email} onChange={handleInputChange} className={classes.textFieldForm} />
          </Grid>
          <Grid container justify="center">
            <Button variant="contained" size="large" color="primary" onClick={onSubmit} className={classes.extraItemsForm}>Submit</Button>
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/login" variant="body1" color="primary" className={classes.extraItemsForm}>Already have an account?</MuiLink>
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/registration" variant="body1" color="primary" className={classes.extraItemsForm}>Sign up for an account</MuiLink>
          </Grid>
        </form>
      </Paper>
    </>
  )
}
