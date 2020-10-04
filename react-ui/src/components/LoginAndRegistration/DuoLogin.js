import React, { Component } from 'react';
import 'whatwg-fetch'
import DuoWebSDK from 'duo_web_sdk';
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
import Navbar from './Navbar';

const STATE_AUTH_PASSED = 'STATE_AUTH_PASSED';
const STATE_AUTH_FAILED = 'STATE_AUTH_FAILED';
const STATE_AUTH_PENDING = 'STATE_AUTH_PENDING';

class DuoLogin extends Component {
  constructor() {
    super();
    this.state = {
      duoAuthState: STATE_AUTH_PENDING,
    };
  }

  componentDidMount() {
    // get the host and signed request from the server
    // so we can initialize the Duo Prompt
    axios.get('/duo_frame')
      .then(res => res.data)
      .then(this.initDuoFrame.bind(this));
  }

  initDuoFrame(json) {
    // initialize the frame with the parameters
    // we have retrieved from the server

    DuoWebSDK.init({
      iframe: "duo-frame",
      host: json.host,
      sig_request: json.sigRequest,
      submit_callback: this.submitPostAction.bind(this),
    });
  }

  submitPostAction(form) {
    // Submit the signed response to our backend for verification.
    const data = JSON.stringify({signedResponse: form.sig_response.value});

    axios.post('/duo_login', data)
      .then(res => {
        if (res.ok) {
          console.log("PASSED"); 
          this.setState({ duoAuthState: STATE_AUTH_PASSED });
        } else {
          console.log("FAILED"); 
          this.setState({ duoAuthState: STATE_AUTH_FAILED });
        }
      }).catch(err => {
        console.log("ERROR"); 
        console.log(err);
      });
  }

  render() {
    let content;

    switch (this.state.duoAuthState) {
    case STATE_AUTH_PASSED:
      content = <h3>Successfully passed Duo Authentication!</h3>
      break;
    case STATE_AUTH_FAILED: 
       content = <h3>Failed Duo Authentication.</h3>
       break;
    default:
      content = <iframe width="1280" height="720" id="duo-frame" />;
      break;
    }

    return (
<<<<<<< HEAD
=======
      <Navbar />
>>>>>>> e1eab0fa41c902a8d4451e84d4f5969c9e2aa556
      <Paper>
        <Grid container justify="center">
          <div className="app">
            {content}
          </div>
        </Grid>
      </Paper>
    );
  }
}

export default DuoLogin;
