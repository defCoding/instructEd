import React, { useState } from 'react'
import axios from 'axios'; 
import { Link as MuiLink, Button, Typography, Grid, TextField, Paper } from '@material-ui/core';
import useForm from './useForm';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import FacebookLogin from 'react-facebook-login';

const initialValues = {
  email: '',
  password: ''
}

export default function Login(props) {
  const {
    values,
    handleInputChange,
    useStyle
  } = useForm(initialValues);

  const classes = useStyle();

  const onSubmit = (e) => {
    e.preventDefault();
    //Attempts to log the user in using given credentials
    axios.post("/authenticate", values)
      .then(res => {
        //If login is successful
        if (res.status === 200) {
          //Begins Duo Authentication
          props.history.push('/duologin');
        }
        //If the email or password given is not correct
        else if(res.status === 401){
          alert("Invalid email or password");
        }
        //If an account with this email already exists, and is associated with a Facebook account
        else if(res.status === 403){
          alert("This account was already created with Facebook");
        }
      })
      .catch(err => {
        alert(err.response.data);
      });
  };

  const responseFacebook = (response) => {
    const data = {
      email: response.email,
      name: response.name,
      fbID: response.userID,
      token: response.accessToken,
      signedRequest: response.signedRequest
    };

    axios.post("/authenticate/facebook", data)
      .then(res => {
        //If login through Facebook was successful
        if (res.status === 200) {
          props.history.push('/duologin');
        }
        //If no Facebook account for given credentials was in the database.
        else if(res.status === 201){
          alert("Facebook account added");
        }
      })
      .catch(err => {
        alert(err.response.data);
      })
  };

  return (
    <>
      <Navbar />
      <Paper className={classes.paperContent}>
        <form className={classes.root}>
          <Grid container justify="center">
            <Typography variant="h2" color="secondary" className={classes.extraItemsForm}>Login</Typography>
          </Grid>
          <Grid container justify="center">
            <TextField variant="outlined" label="Email" name="email" value={values.email} onChange={handleInputChange} className={classes.textFieldForm} />
            <TextField variant="outlined" label="Password" name="password" type="password" value={values.password} onChange={handleInputChange} className={classes.textFieldForm} />
          </Grid>
          <Grid container justify="center">
            <Button variant="contained" size="large" color="secondary" onClick={onSubmit} className={classes.extraItemsForm}>Submit</Button>
          </Grid>
          <Grid container justify="center">
            <FacebookLogin appId="350577486197278" autoLoad={false} fields="name,email,picture" callback={responseFacebook} className={classes.extraItemsForm} />
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/registration" variant="body1" color="secondary" className={classes.links}>Sign up for an account</MuiLink>
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/forgotpassword" variant="body1" color="secondary" className={classes.links}>Forgot password?</MuiLink>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
