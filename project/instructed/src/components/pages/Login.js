import React from 'react';

/* function Login() {
  return (
    <>
    <div className="input-areas">
      <form>
      <input 
        name="userName"
        placeholder="Username"
      /><br />
      <input 
        name="password"
        type="password"
        placeholder="Password"
      /><br />
      <button>Submit</button>
      </form>
    </div>
    </>
  )
}

export default Login; */



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
            <form>
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
                <button onClick={this.onSubmit}>Submit</button>
                <Link to="/registration">Create an account</Link>
            </form>
        )
    }
}