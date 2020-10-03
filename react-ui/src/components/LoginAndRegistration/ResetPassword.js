import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as Button, Typography, Grid, TextField, Paper } from '@material-ui/core';
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
      });
    } else {
      alert("Passwords are not the same!");
    }
  };

  useEffect(() => {
    axios.get(`/resetPassword/${props.match.params.token}`)
      .then(res => {
        if (res.status === 200) {
          updateValidity(true);
        }
      }).catch(err => {
        updateValidity(false);
      });
  }, []);

  if (validToken) {
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
    );
  } else {
    return (
      <>
        <Navbar />
        <Paper className={classes.paperContent}>
          <h1>INVALID TOKEN.</h1>
        </Paper>
      </>
    );
  }
}
