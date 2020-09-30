import React from 'react'
import { Link as MuiLink, Button, Typography, Grid, TextField, Paper } from '@material-ui/core';
import useForm from './useForm';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const initialValues = {
  email: '',
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
      <Navbar />
      <Paper className={classes.paperContent}>
        <form className={classes.root}>
          <Grid container justify="center">
            <Typography variant="h1">Login</Typography>
          </Grid>
          <Grid container>
            <TextField variant="outlined" label="Email" name="email" value={values.email} onChange={handleInputChange} className={classes.textFieldForm} />
            <TextField variant="outlined" label="Password" name="password" type="password" value={values.password} onChange={handleInputChange} className={classes.textFieldForm} />
          </Grid>
          <Grid container justify="center">
            <Button variant="contained" size="large" color="primary" onClick={onSubmit} className={classes.extraItemsForm}>Submit</Button>
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/registration" variant="body1" color="primary" className={classes.extraItemsForm}>Sign up for an account</MuiLink>
          </Grid>
          <Grid container justify="center">
            <MuiLink component={Link} to="/forgotpassword" variant="body1" color="primary" className={classes.extraItemsForm}>Forgot password?</MuiLink>
          </Grid>
        </form>
      </Paper>
    </>
  )
}
