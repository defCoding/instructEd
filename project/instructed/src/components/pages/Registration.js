import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      confirmPassword: ''
    }
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

