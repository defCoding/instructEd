import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LoginAndRegistration.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Login extends React.Component {
    constructor() {
      super();
      this.state = {
          userName: '',
          password: ''
      };
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
            <Typography variant="h2">Login</Typography>
              <form>
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
                  <Button size="medium" variant="outlined" onClick={this.onSubmit}>Submit</Button>
                </form>
                <Link to="/registration"><Typography variant="overline">Create an account</Typography></Link>
          </div>
          </>
        )
    }
}