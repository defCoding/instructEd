import React from 'react';
import axios from 'axios';

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
    } else {
      axios.post('/', this.state);
      console.log(this.state);
    }
  };

  render() {
    return (
      <form>
        <input
          name="firstName"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.change}
        />
        <br />
        <input
          name="lastName"
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={this.change}
        />
        <br />
        <input
          name="email"
          type="email"
          placeholder="email@email.com"
          value={this.state.email}
          onChange={this.change}
        />
        <br />
        <input
          name="userName"
          placeholder="Username"
          value={this.state.userName}
          onChange={this.change}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.change}
        />
        <br />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={this.state.confirmPassword}
          onChange={this.change}
        />
        <br />
        <button onClick={this.onSubmit}>Submit</button>
      </form>
    );
  }
}

