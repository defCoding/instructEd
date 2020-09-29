import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react'
import useForm from './useForm';
import axios from 'axios';

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
      <form className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classes.title}>
              <Typography
                variant="h1">
                Registration
              </Typography>
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <TextField 
              variant="outlined"
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleInputChange}
            />
            <TextField 
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleInputChange}
            />
            <TextField 
              variant="outlined"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
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
            <TextField 
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
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
    </>
  )
}


/* import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class Registration extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: ''
  }

  change = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      console.log("PASSWORD IS NOT THE SAME!");
    } 
    else {
      axios.post('/', this.state);
      console.log(this.state);
    }
  };

  render() {
    return (
      <>
      <div>
        <Typography variant="h2">Sign Up</Typography>
          <form>

            <TextField
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.change}
            />
            <br />
            <TextField
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.change}
            />
            <br />
            <TextField
              name="email"
              type="email"
              placeholder="email@email.com"
              value={this.state.email}
              onChange={this.change}
            />
            <br />
            <TextField
              name="userName"
              placeholder="Username"
              value={this.state.userName}
              onChange={this.change}
            />
            <br />
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.change}
            />
            <br />
            <TextField
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.change}
            />
            <br />
            <Button size="medium" variant="outlined" onClick={this.onSubmit}>Submit</Button>
          </form>
          <Link to="/login"><Typography variant="overline">Login to account</Typography></Link>
      </div>
      </>
    );
  }
}

export default Registration */