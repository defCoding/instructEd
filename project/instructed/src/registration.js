import React from 'react';

export default class Login extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        confirmPassword: ''
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = () => {
        console.log(this.state);
    };

    render() {
        return (
            <form>
                <input 
                    name="firstName" 
                    placeholder="firstName" 
                    value={this.state.firstName}
                    onChange={e => this.change(e)} 
                /><br/>
                <input 
                    name="lastName" 
                    placeholder="lastName"
                    value={this.state.lastName}
                    onChange={e => this.change(e)} 
                /><br/>
                <input 
                    name="email" 
                    placeholder="email" 
                    value={this.state.email}
                    onChange={e => this.change(e)} 
                /><br/>
                <input 
                    name="userName" 
                    placeholder="userName"
                    value={this.state.userName}
                    onChange={e => this.change(e)} 
                /><br/>
                <input 
                    name="password"
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={e => this.change(e)} 
                /><br/>
                <input 
                    name="confirmPassword"
                    type="password"
                    placeholder="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={e => this.change(e)} 
                /><br/>
                <button onClick = {() => this.onSubmit()}>Submit</button>
            </form>
        )
    }
}