import React, { useEffect, useState } from 'react';
import 'whatwg-fetch'
import DuoWebSDK from 'duo_web_sdk';
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
import Navbar from './Navbar';

const STATE_AUTH_PASSED = 'STATE_AUTH_PASSED';
const STATE_AUTH_FAILED = 'STATE_AUTH_FAILED';
const STATE_AUTH_PENDING = 'STATE_AUTH_PENDING';

export default function DuoLogin(props) {
  const [duoAuthState, setAuthState] = useState(STATE_AUTH_PENDING);

  useEffect(() => {
    // Check and see if user has already logged in.
    axios.get('/authorize')
      .then(res => {
        if (res.status === 200) {
          props.history.push('/dashboard');
        }
      }).catch(err => {
        // get the host and signed request from the server
        // so we can initialize the Duo Prompt
        axios.get('/duo_frame')
          .then(res => res.data)
          .then(initDuoFrame);
      });
    }, []);

  const initDuoFrame = (json) => {
    // initialize the frame with the parameters
    // we have retrieved from the server
    DuoWebSDK.init({
      iframe: "duo-frame",
      host: json.host,
      sig_request: json.sigRequest,
      submit_callback: submitPostAction
    });
  }

  const submitPostAction = (form) => {
    // Submit the signed response to our backend for verification.
    const data = {signedResponse: form.sig_response.value};

    axios.post('/duo_login', data)
      .then(res => {
        if (res.status === 200) {
          setAuthState(STATE_AUTH_PASSED);
          props.history.push('/dashboard');
        } else {
          setAuthState(STATE_AUTH_FAILED);
        }
      }).catch(err => {
        console.log(err);
      });
  }

  let content;

  switch (duoAuthState) {
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
        <div className="app">
          {content}
        </div>
  );
}
