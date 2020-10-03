import { Link as MuiLink, Paper, Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import useForm from './useForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import FacebookLogin from 'react-facebook-login';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
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
      axios.post('/users', values);
    }
  };

  /* 
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '350577486197278',
      xfbml      : true,
      version    : 'v8.0'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   */

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [email, setEmail] = useState({});

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setEmail(response);
    if (response.accessToken) {
      setLogin(true);
      console.log(login);
      console.log(data);
      console.log(email);
    } else {
      setLogin(false);
    }
  }

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
            <FacebookLogin appId="350577486197278" autoLoad={false} fields="name,email" scope="public_profile" callback={responseFacebook} icon="fa-facebook" className={classes.extraItemsForm} />
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/login" variant="body1" color="primary" className={classes.links}>Already have an account?</MuiLink>
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/forgotpassword" variant="body1" color="primary" className={classes.links}>Forgot password?</MuiLink>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
