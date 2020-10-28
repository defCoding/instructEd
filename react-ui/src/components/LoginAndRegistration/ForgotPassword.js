import React, { Component } from 'react';
import axios from 'axios';
import { Link as MuiLink, Button, Typography, Grid, TextField, Paper } from '@material-ui/core';
import useForm from './useForm';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const initialValues = {
  email: ''
}

export default function ForgotPassword(props) {

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
        //If recovery email was accepted and sent
        if (res.status === 200) {
          alert(res.data);
        }
        else if(res.status === 404){
          alert("Email provided is not associated with any account");
        }
        else if(res.status === 422){
          alert("The account associated with this email was created via Facebook");
        }
        else if(res.status === 500){
          alert("There was an error sending the recovery email")
        }
      }).catch(err => {
        alert(err.response.data);
      });
    props.history.push('/login');
  };

  return(
    <>
      <Navbar />
      <Paper className={classes.paperContent}>
        <form className={classes.root}>
          <Grid container justify="center">
            <Typography variant="h2" color="secondary" className={classes.extraItemsForm}>Forgot Password</Typography>
          </Grid>
          <Grid container justify="center">
            <TextField color="secondary" variant="outlined" label="Email" name="email" value={values.email} onChange={handleInputChange} className={classes.textFieldForm} />
          </Grid>
          <Grid container justify="center">
            <Button color="primary" variant="contained" size="large" onClick={onSubmit} className={classes.extraItemsForm}>Get Link</Button>
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/login" color="secondary" variant="body1" className={classes.extraItemsForm}>Already have an account?</MuiLink>
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/registration" color="secondary" variant="body1" className={classes.extraItemsForm}>Sign up for an account</MuiLink>
          </Grid>
        </form>
      </Paper>
    </>
  )
}
