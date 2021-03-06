import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, Grid, TextField, Paper } from '@material-ui/core';
import useForm from './useForm';
import Navbar from './Navbar';

const initialValues = {
  password: '',
  confirmPassword: ''
}

export default function ResetPassword(props) {
  
  const {
    values,
    handleInputChange,
    useStyle
  } = useForm(initialValues);

  const [ validToken, updateValidity ] = useState(false);

  const classes = useStyle();

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.password === values.confirmPassword) {
      axios.post('/updatePassword', { 
        token: props.match.params.token,
        password: values.password
      }).then(res => {
        if (res.status === 201) {
          alert("Password has been updated.");
        }
      }).catch(err => {
        alert('Something went wrong. Please try again later.');
      });
      props.history.push('/login');
    } else {
      alert("Passwords are not the same!");
    }
  };

  useEffect(() => {
    console.log('CHECKING TOKEN');
    console.log(props.match.params.token);
    axios.get(`/resetPassword/${props.match.params.token}`)
      .then(res => {
        if (res.status === 200) {
          console.log('GOOD TOKEN');
          updateValidity(true);
        }
      }).catch(err => {
        console.log('BAD TOKEN');
        updateValidity(false);
      });
  }, []);

  if (validToken) {
    console.log('SENDING GOOD TOKEN PAGE');
    return (
      <>
        <Paper className={classes.paperRoot}>
          <Navbar />
          <Paper className={classes.paperContent}>
            <form className={classes.root}>
              <Grid container justify="center">
                <Typography variant="h2" color="secondary" className={classes.extraItemsForm}>Create New Password</Typography>
              </Grid>
              <Grid container justify="center">
                <TextField color="secondary" variant="outlined" label="New Password" name="password" type="password" value={values.password} onChange={handleInputChange} className={classes.textFieldForm} />
                <TextField color="secondary" variant="outlined" label="Confirm Password" name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleInputChange} className={classes.textFieldForm} />
              </Grid>
              <Grid container justify="center">
                <Button color="primary" variant="contained" size="large" onClick={onSubmit} className={classes.extraItemsForm}>Reset Password</Button>
              </Grid>
            </form>
          </Paper>
        </Paper>
      </>
    );
  } else {
    console.log('SENDING BAD TOKEN PAGE');
    return (
      <>
        <Paper className={classes.paperRoot}>
          <Navbar />
          <Paper className={classes.paperContent}>
            <h1>INVALID TOKEN.</h1>
          </Paper>
        </Paper>
      </>
    );
  }
}
