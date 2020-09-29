import React, { useState } from 'react'
import { Button, Typography, Grid, TextField, Paper } from '@material-ui/core';
import useForm from './useForm';

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

  return (
    <>
      <Paper>
        <form className={classes.root}>
          <Grid container>
            <Grid item xs={12} className={classes.title}>
              <Typography
                variant="h1">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.form}>
              <TextField 
                variant="outlined"
                label="Username"
                name="userName"
                value={values.userName}
                onChange={handleInputChange}
              />
              <TextField 
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.submit}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  )
}


/* import React from 'react'; 
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

export default function Login {
  state = {
    userName: '',
    password: ''
  }

  change = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  onSubmit = () => {
    console.log(this.state);
  };

  return (
    <form className={classes.root}>
      <Grid container

    </form>
  )
    return (
      <>
      <div>
        <Typography 
          variant="h2">
            Login
        </Typography>
          <form>
            <TextField
              name="userName"
              placeholder="Username"
              variant="outlined"
              style={styles.TextField}
              value={this.state.userName}
              onChange={this.change} 
            />
            <br />
            <TextField 
              name="password"
              type="password"
              variant="outlined"
              style={styles.TextField}
              placeholder="Password" 
              value={this.state.password}
              onChange={this.change}  
            />
            <br />
            <Button 
              size="medium" 
              variant="outlined" 
              style={styles.button}
              onClick={this.onSubmit}>
                Submit
            </Button>
          </form>
          <Link 
            to="/registration">
              <Typography 
                variant="overline">
                  Create an account
              </Typography>
          </Link>
      </div>
      </>
    )
  }
}

const styles = {
  button: {
    margin: 25
  },
  TextField: {
    margin: 7
  }
}

export default Login */