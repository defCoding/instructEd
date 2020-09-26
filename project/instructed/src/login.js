import React from 'react';

export default class Login extends React.Component {
    state = {
        userName: '',
        password: ''
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <form>
                <input 
                    name="userName"
                    placeholder='userName' 
                    value={this.state.userName}
                    onChange={e => this.change(e)} 
                /><br/>
                <input 
                    name="password"
                    placeholder="password" 
                    value={this.state.password}
                    onChange={e => this.change(e)}  
                />
                <br/>
                <button onClick = {() => this.onSubmit()}>Submit</button>
            </form>
        )
    }
}