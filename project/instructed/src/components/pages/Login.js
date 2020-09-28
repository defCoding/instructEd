import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

export class Login extends React.Component {
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

  render() {
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
              style={styles.everything}
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
    margin: 15
  },
  TextField: {
    margin: 15
  }
}

export default Login