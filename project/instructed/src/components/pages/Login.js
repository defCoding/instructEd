import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LoginAndRegistration.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
            <Typography variant="h1">Login</Typography>
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
                  <button onClick={this.onSubmit}>Submit</button>
                </form>
                <Link to="/registration"><Typography>Create an account</Typography></Link>
          </div>
          </>
        )
    }
}